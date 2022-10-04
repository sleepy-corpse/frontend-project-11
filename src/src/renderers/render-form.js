export default (state, i18nInstance, formElements) => {
  formElements.feedback.textContent = '';
  switch (state.downloadingRSS.state) {
    case 'failed':
      formElements.input.removeAttribute('disabled');
      formElements.input.classList.add('is-invalid');
      formElements.mainButton.removeAttribute('disabled');
      formElements.feedback.classList.replace('text-success', 'text-danger');
      formElements.feedback.textContent = i18nInstance.t(`errors.${state.error}`);
      break;
    case 'active':
      formElements.input.classList.remove('is-invalid');
      formElements.input.setAttribute('disabled', '');
      formElements.mainButton.setAttribute('disabled', '');
      break;
    case 'complete':
      formElements.input.classList.remove('is-invalid');
      formElements.input.removeAttribute('disabled');
      formElements.mainButton.removeAttribute('disabled');
      formElements.feedback.textContent = i18nInstance.t('success.msg');
      formElements.feedback.classList.replace('text-danger', 'text-success');
      formElements.form.reset();
      break;
    default:
      break;
  }
};
