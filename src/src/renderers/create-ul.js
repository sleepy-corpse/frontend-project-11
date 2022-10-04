export default (containerName, parentDiv, i18nInstance) => {
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
  parentDiv.textContent = '';
  parentDiv.append(card);

  return ul;
};
