import createUl from './create-ul';

export default (state, parentDiv, i18nInstance) => {
  const postsUl = createUl('posts', parentDiv, i18nInstance);
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
