import onChange from 'on-change';
import renderFeedsList from './renderers/render-feeds-list';
import renderPostsList from './renderers/render-posts-list';
import renderForm from './renderers/render-form';
import renderModal from './renderers/render-modal';

export default (state, elements, i18nInstance) => {
  const watchedState = onChange(state, (path) => {
    switch (path) {
      case 'downloadingRSS.state':
        renderForm(watchedState, elements.formElements, i18nInstance);
        break;
      case 'feeds':
        renderFeedsList(watchedState, elements.feedsDiv, i18nInstance);
        break;
      case 'modal.selectedPost':
        renderModal(watchedState, elements.modalElements, i18nInstance);
        break;
      case 'uiState.visitedPosts':
        renderPostsList(watchedState, elements.postsDiv, i18nInstance);
        break;
      case 'posts':
        renderPostsList(watchedState, elements.postsDiv, i18nInstance);
        break;
      default:
        break;
    }
  });
  return watchedState;
};
