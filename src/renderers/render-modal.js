export default (watchedState, modal, i18nInstance) => {
  const currentPost = watchedState.posts.find((pst) => pst.id === watchedState.modal.selectedPost);
  modal.title.textContent = currentPost.title;
  modal.description.textContent = currentPost.description;
  modal.footer.textContent = '';
  const goBtn = document.createElement('a');
  goBtn.textContent = i18nInstance.t('buttons.modal.go');
  goBtn.href = currentPost.link;
  goBtn.className = 'btn btn-primary full-article';
  goBtn.setAttribute('role', 'button');
  goBtn.setAttribute('target', '_blank');
  goBtn.setAttribute('rel', 'noopener noreferer');
  const closeBtn = document.createElement('button');
  closeBtn.setAttribute('type', 'button');
  closeBtn.setAttribute('data-bs-dismiss', 'modal');
  closeBtn.className = 'btn btn-secondary modal-close-footer';
  closeBtn.textContent = i18nInstance.t('buttons.modal.close');
  modal.footer.append(goBtn, closeBtn);
};
