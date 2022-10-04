import onChange from 'on-change';

const form = document.querySelector('form');
const feedback = document.querySelector('.feedback');
const input = document.querySelector('#url-input');
const mainButton = document.querySelector('button[type="submit"]');
const postsDiv = document.querySelector('.posts');
const feedsDiv = document.querySelector('.feeds');

export default (state, i18nInstance) => {

  const createUl = (containerName) => {
    const card = document.createElement('div');
    card.classList.add('card', 'border-0');
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    const cardTitle = document.createElement('h2');
    cardTitle.classList.add('card-title', 'h4');
    cardTitle.textContent = i18nInstance.t(`containerNames.${containerName}`);
    const ul = document.createElement('ul');
    ul.classList.add('list-group', 'border-0', 'rounded-0', 'posts-list');
    card.append(cardBody);
    card.append(ul);
    cardBody.append(cardTitle);
    if (containerName === 'posts') {
      postsDiv.textContent = '';
      postsDiv.append(card);
    }
    if (containerName === 'feeds') {
      feedsDiv.textContent = '';
      feedsDiv.append(card);
    }

    return ul;
  };

  const renderFeedsList = () => {
    const feedsUl = createUl('feeds');
    state.feeds.forEach((feed) => {
      const li = document.createElement('li');
      li.className = 'list-group-item border-0 border-end-0';
      const header = document.createElement('h3');
      header.className = 'h6 m-0';
      header.textContent = feed.title;
      const p = document.createElement('p');
      p.className = 'm-0 small text-black-50';
      p.textContent = feed.description;
      li.append(header, p);
      feedsUl.append(li);
    });
  };

  const renderPosts = () => {
    const postsUl = createUl('posts');
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
    feedback.textContent = '';

    switch (state.downloadingRSS.state) {
      case 'stopped':
        input.removeAttribute('disabled');
        input.classList.add('is-invalid');
        mainButton.removeAttribute('disabled');
        feedback.classList.replace('text-success', 'text-danger');
        feedback.textContent = i18nInstance.t(`errors.${state.error}`);
        break;
      case 'active':
        input.classList.remove('is-invalid');
        input.setAttribute('disabled', '');
        mainButton.setAttribute('disabled', '');
        break;
      case 'complete':
        input.classList.remove('is-invalid');
        input.removeAttribute('disabled');
        mainButton.removeAttribute('disabled');
        feedback.textContent = i18nInstance.t(`success.msg`);
        feedback.classList.replace('text-danger', 'text-success');
        form.reset();
        break;
      default:
        break;
    }
  };

  return onChange(state, (path) => {
    switch (path) {
      case 'error':
        renderForm();
        break;
      case 'downloadingRSS.state':
        renderForm();
        break;
      case 'posts':
        renderPosts();
        break;
      case 'feeds':
        renderFeedsList();
        break;
      default:
        break;
    }
  });
};
