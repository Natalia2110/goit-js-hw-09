const formData = {
  email: '',
  message: '',
};

const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
// console.log(form);

form.addEventListener('input', () => {
  formData.email = form.elements.email.value.trim();
  formData.message = form.elements.message.value.trim();
  // console.log(formData);
  saveToLocalStorage(STORAGE_KEY, formData);
  // return formData;
});

function saveToLocalStorage(key, value) {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}

function loadFromLocalStorage(key) {
  const json = localStorage.getItem(key);
  try {
    const data = JSON.parse(json);
    return data;
  } catch {
    return json;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const data = loadFromLocalStorage(STORAGE_KEY);

  formData.email = data?.email || '';
  formData.message = data?.message || '';
  // console.log(formData);

  form.elements.email.value = formData.email;
  form.elements.message.value = formData.message;
});

form.addEventListener('submit', event => {
  event.preventDefault();
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();
  if (email !== '' && message !== '') {
    formData.email = email;
    formData.message = message;
    console.log(formData);

    form.reset();
    localStorage.removeItem(STORAGE_KEY);
    formData.email = '';
    formData.message = '';
  } else {
    alert('Fill please all fields');
  }
});
