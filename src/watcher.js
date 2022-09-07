import onChange from 'on-change';

const form = document.querySelector('form');
const feedback = document.querySelector('.feedback');
const input = document.querySelector('#url-input');
export default (state) => onChange(state, () => {
  if (!state.error) {
    feedback.textContent = '';
    input.classList.remove('is-invalid');
    form.reset();
  } else {
    feedback.textContent = state.error;
    input.classList.add('is-invalid');
  }
})