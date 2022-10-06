import onChange from 'on-change';
import renderFeedsList from './renderers/render-feeds-list';
import renderPostsList from './renderers/render-posts-list';
import renderForm from './renderers/render-form';
import renderModal from './renderers/render-modal';

const form = document.querySelector('form');
const feedback = document.querySelector('.feedback');
const input = document.querySelector('#url-input');
const mainButton = document.querySelector('button[type="submit"]');
const postsDiv = document.querySelector('.posts');
const feedsDiv = document.querySelector('.feeds');
const modalTitle = document.querySelector('.modal-title');
const modalDescription = document.querySelector('.modal-body');
const modalFooter = document.querySelector('.modal-footer');
// const modalGoBtn = document.querySelector('.full-article');
// const modalCloseBtn = document.querySelector('.modal-close-footer');
const formElements = {
  form, feedback, input, mainButton,
};
const modalElements = {
  title: modalTitle,
  description: modalDescription,
  footer: modalFooter,
  // goBtn: modalGoBtn,
  // closeBtn: modalCloseBtn,
};

export default (state, i18nInstance) => {
  const watchedState = onChange(state, (path) => {
    switch (path) {
      case 'downloadingRSS.state':
        renderForm(watchedState, i18nInstance, formElements);
        break;
      case 'feeds':
        renderFeedsList(watchedState, feedsDiv, i18nInstance);
        break;
      case 'modal.selectedPost':
        renderModal(watchedState, i18nInstance, modalElements);
        break;
      default:
        break;
    }
    if (path.includes('posts')) {
      renderPostsList(watchedState, postsDiv, i18nInstance);
    }
  });
  return watchedState;
};
