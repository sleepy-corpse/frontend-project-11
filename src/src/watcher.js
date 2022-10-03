import onChange from 'on-change';

const form = document.querySelector('form');
const feedback = document.querySelector('.feedback');
const input = document.querySelector('#url-input');
const postsDiv = document.querySelector('.posts');


export default (state, i18nInstance) => {
  const renderFeedsList = () => {

  };
  
  const renderPosts = () => {
    postsDiv.textContent = '';
    const postsCard = document.createElement('div');
    postsCard.classList.add('card', 'border-0');
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    const cardTitle = document.createElement('h2');
    cardTitle.classList.add('card-title', 'h4');
    cardTitle.textContent = 'Посты';
    const postsUl = document.createElement('ul');
    postsUl.classList.add('list-group', 'border-0', 'rounded-0', 'posts-list');
    postsDiv.append(postsCard);
    postsCard.append(cardBody);
    postsCard.append(postsUl);
    cardBody.append(cardTitle);
    state.posts.forEach((post) => {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-start border-0 border-end-0';
      const a = document.createElement('a');
      a.href = post.link;
      a.className = 'fw-bold';
      a.dataset.id = post.id;
      a.target = '_blank';
      a.rel = 'noopener noreferer';
      a.textContent = post.title;
      li.append(a);
      postsUl.append(li);
    });  
  };
  
  const renderForm = () => {
    if (!state.error) {
      feedback.textContent = '';
      input.classList.remove('is-invalid');
      if (state.downloadingRSS.state === 'stopped') {
        form.reset();
      }
    } else {
      feedback.textContent = i18nInstance.t(`errors.${state.error}`);
      input.classList.add('is-invalid');
    }
  };
  return onChange(state, (path) => {
    switch (path) {
      case 'error':
        console.log('fuck')
        renderForm();
        break;
      case 'downloadingRSS.state':
        console.log('downloading or not');
        renderForm();
        break;
      case 'posts':
        console.log('posts');
        renderPosts();
        break;
      case 'feeds':
        renderFeedsList();
        break;
      default:
        break;
    }
  });
}
