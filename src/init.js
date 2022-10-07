import * as yup from 'yup';
import i18n from 'i18next';
import axios from 'axios';
import createStateWatcher from './view';
import resources from './locales/ru';
import parseRSS from './parse-rss';

const elements = {
  formElements: {
    form: document.querySelector('form'),
    header: document.querySelector('h1'),
    example: document.querySelector('.example'),
    feedback: document.querySelector('.feedback'),
    input: document.querySelector('#url-input'),
    inputLabel: document.querySelector('label[for="url-input"'),
    mainButton: document.querySelector('button[type="submit"]'),
  },
  postsDiv: document.querySelector('.posts'),
  feedsDiv: document.querySelector('.feeds'),
  modalElements: {
    title: document.querySelector('.modal-title'),
    description: document.querySelector('.modal-body'),
    footer: document.querySelector('.modal-footer'),
  }
};

const getNewPosts = (outerState) => {
  if (outerState.feeds.length < 1) {
    return setTimeout(() => {
      getNewPosts(outerState);
    }, 5000);
  }
  const urls = [];
  const promises = outerState.feeds.map((feed) => {
    urls.push(feed.url);
    return axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(feed.url)}`);
  });
  Promise.all(promises).then((responses) => {
    responses.forEach((response, index) => {
      const rss = parseRSS(response.data.contents);
      const feedId = outerState.feeds.find((feed) => feed.url === urls[index]).id;
      const newPosts = rss.posts
        .filter((post) => outerState.posts
          .filter((oldPost) => post.link === oldPost.link).length === 0);
      if (newPosts.length > 0) {
        const formattedPosts = newPosts.map((newPost, newPostIndex) => ({
          ...newPost,
          id: outerState.posts.length + newPosts.length - newPostIndex,
          feedId,
        }));
        outerState.posts.unshift(...formattedPosts);
      }
    });
  }).finally(() => 
    setTimeout(() => {
      getNewPosts(outerState);
    }, 5000)
  );
};

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
        state: '',
      },
      error: '',
      feeds: [],
      posts: [],
      modal: {
        selectedPost: '',
      },
      uiState: {
        visitedPosts: [],
      }
    };
    yup.setLocale({
      string: {
        url: 'invalid',
      },
    });
    const watchedState = createStateWatcher(state, elements, i18nInstance);
    setTimeout(() => {
      getNewPosts(watchedState);
    }, 5000);

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const url = formData.get('url');
      downloadRSS(watchedState, url);
    });

    watchedState.downloadingRSS.state = 'not-active';
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
