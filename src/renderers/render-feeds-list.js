import createUl from './create-ul';

export default (watchedState, parentDiv, i18nInstance) => {
  const feedsUl = createUl('feeds', parentDiv, i18nInstance);
  watchedState.feeds.forEach((feed) => {
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
