import * as yup from 'yup';
import createStateWatcher from './watcher.js';

export default () => {
  const form = document.querySelector('form');
  const state = {
    form: {
      input: {
        isValid: true,
        isDuplicate: false,
      },
      error: '',
    },
    feed: [],
  };
  const watchedState = createStateWatcher(state);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const urlSchema = yup.string().url();
    const formData = new FormData(form);
    const url = formData.get('url');
    urlSchema.isValid(url).then((res) => {
      state.form.input.isValid = res;
      state.form.input.isDuplicate = state.feed.filter((item) => item.url === url).length > 0;
      if (state.form.input.isValid ) {
        if (!state.form.input.isDuplicate) {
          state.feed.push({ url });
          watchedState.error = '';
        } else {
          watchedState.error = 'duplicate';
        }
      } else {
        watchedState.error = 'invalid';
      };
      console.log(state);
    });
  });
}