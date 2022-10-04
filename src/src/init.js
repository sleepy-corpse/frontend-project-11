import * as yup from 'yup';
import i18n from 'i18next';
import axios from 'axios';
import createStateWatcher from './watcher';
import resources from './locales/ru';
import parseRSS from './parse-rss';

export default () => {
  const app = (i18nInstance) => {
    const form = document.querySelector('form');
    const state = {
      form: {
        isValid: true,
      },
      downloadingRSS: {
        state: 'stopped',
      },
      error: '',
      feeds: [],
      posts: [],
    };

    yup.setLocale({
      string: {
        url: 'invalid',
      },
    });

    const watchedState = createStateWatcher(state, i18nInstance);
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const urlSchema = yup.string().url().test(
        'is-not-duplicate',
        'duplicate',
        (url) => state.feeds.filter((item) => item.url === url).length === 0,
      );
      const formData = new FormData(form);
      const url = formData.get('url');
      urlSchema.validate(url)
        .then(() => {
          watchedState.downloadingRSS.state = 'active';
          watchedState.error = '';
        })
        .then(() => axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`))
        .then((response) => {
          //console.log(response.data.contents);
          const rss = parseRSS(response.data.contents);
          rss.feed.id = state.feeds.length + 1;
          rss.posts = rss.posts.map((post, index) => ({
            ...post,
            id: state.posts.length + rss.posts.length - index,
            feedId: rss.feed.id,
          }));
          watchedState.feeds.unshift({ ...rss.feed, url });
          watchedState.posts.unshift(...rss.posts);
          watchedState.downloadingRSS.state = 'complete';
          console.log(state);
        })
        .catch((error) => {
          state.downloadingRSS.state = 'stopped';
          watchedState.error = error.message.includes('Network') ? 'network' : error.message;
          console.log(state);
        });
    });
  };

  const runApp = () => {
    const i18nInstance = i18n.createInstance();
    i18nInstance.init({
      lng: 'ru',
      debug: false,
      resources,
    }).then(() => app(i18nInstance));
  };

  runApp();
};
