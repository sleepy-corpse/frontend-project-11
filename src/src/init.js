import * as yup from 'yup';
import i18n from 'i18next';
import axios from 'axios';
import createStateWatcher from './view';
import resources from './locales/ru';
import parseRSS from './parse-rss';
import timeoutCallback from './timeout-callback';

const downloadRSS = (state, url) => {
  const urlSchema = yup.string().url().test(
    'is-not-duplicate',
    'duplicate',
    (testedUrl) => state.feeds.filter((item) => item.url === testedUrl).length === 0,
  );
  urlSchema.validate(url)
    .then(() => {
      state.downloadingRSS.state = 'active';
      state.error = '';
    })
    .then(() => axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`))
    .then((response) => {
      const rss = parseRSS(response.data.contents);
      rss.feed.id = state.feeds.length + 1;
      rss.posts = rss.posts.map((post, index) => ({
        ...post,
        id: state.posts.length + rss.posts.length - index,
        feedId: rss.feed.id,
      }));
      state.feeds.unshift({ ...rss.feed, url });
      state.posts.unshift(...rss.posts);
      state.downloadingRSS.state = 'complete';
    })
    .catch((error) => {
      state.error = error.message.includes('Network') ? 'network' : error.message;
      state.downloadingRSS.state = 'failed';
    });
};

export default () => {
  const app = (i18nInstance) => {
    const form = document.querySelector('form');
    const state = {
      downloadingRSS: {
        state: 'not-active',
      },
      error: '',
      feeds: [],
      posts: [],
      modal: {
        selectedPost: '',
      },
    };
    yup.setLocale({
      string: {
        url: 'invalid',
      },
    });
    const watchedState = createStateWatcher(state, i18nInstance);
    setTimeout(() => {
      timeoutCallback(watchedState);
    }, 5000);

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const url = formData.get('url');
      downloadRSS(watchedState, url);
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
