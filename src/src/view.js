import onChange from 'on-change';
import renderFeedsList from './renderers/render-feeds-list';
import renderPostsList from './renderers/render-posts-list';
import renderForm from './renderers/render-form';

const form = document.querySelector('form');
const feedback = document.querySelector('.feedback');
const input = document.querySelector('#url-input');
const mainButton = document.querySelector('button[type="submit"]');
const postsDiv = document.querySelector('.posts');
const feedsDiv = document.querySelector('.feeds');

const formElements = {
  form, feedback, input, mainButton,
};

export default (state, i18nInstance) => onChange(state, (path) => {
  switch (path) {
    case 'error':
      renderForm(state, i18nInstance, formElements);
      break;
    case 'downloadingRSS.state':
      renderForm(state, i18nInstance, formElements);
      break;
    case 'posts':
      renderPostsList(state, postsDiv, i18nInstance);
      break;
    case 'feeds':
      renderFeedsList(state, feedsDiv, i18nInstance);
      break;
    default:
      break;
  }
});
