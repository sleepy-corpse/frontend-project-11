import createUl from './create-ul';
import markPostAsRead from '../mark-post-as-read';

export default (watchedState, parentDiv, i18nInstance) => {
  const postsUl = createUl('posts', parentDiv, i18nInstance);
  watchedState.posts.forEach((post) => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-start border-0 border-end-0';
    const a = document.createElement('a');
    a.addEventListener('click', () => {
      markPostAsRead(watchedState, post.id);
    });
    if (post.visited) {
      a.className = 'fw-normal link-secondary';
    } else {
      a.className = 'fw-bold';
    }
    a.href = post.link;
    a.dataset.id = post.id;
    a.target = '_blank';
    a.rel = 'noopener noreferer';
    a.textContent = post.title;
    const btn = document.createElement('button');
    btn.addEventListener('click', () => {
      watchedState.modal.selectedPost = post.id;
    });
    btn.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    btn.dataset.bsToggle = 'modal';
    btn.dataset.bsTarget = '#infoModal';
    btn.dataset.id = post.id;
    btn.textContent = 'Просмотр';
    li.append(a, btn);
    postsUl.append(li);
  });
};
