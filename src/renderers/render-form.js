export default (watchedState, formElements, i18nInstance) => {
  formElements.mainButton.textContent = i18nInstance.t('buttons.addRSS');
  formElements.header.textContent = i18nInstance.t('header');
  formElements.inputLabel.textContent = i18nInstance.t('inputLabel');
  formElements.example.textContent = i18nInstance.t('example');
  formElements.feedback.textContent = '';
  switch (watchedState.downloadingRSS.state) {
    case 'failed':
      formElements.input.removeAttribute('disabled');
      formElements.input.classList.add('is-invalid');
      formElements.mainButton.removeAttribute('disabled');
      formElements.feedback.classList.replace('text-success', 'text-danger');
      formElements.feedback.textContent = i18nInstance.t(`errors.${watchedState.error}`);
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
