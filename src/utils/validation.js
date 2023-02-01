export function validate(data, form) {
  let count = 0;
  let result = false;

  const error = (value, text) => {
    const parent = value.parentNode;
    const errorDiv = document.getElementById(`error_${value.name}`);
    if (!errorDiv) {
      const errorDiv = document.createElement('div');
      errorDiv.setAttribute('id', `error_${value.name}`);
      errorDiv.innerHTML = `Поле ${value.placeholder} ${text}`;

      if (value.classList.contains('user_settings')) {
        errorDiv.classList.add('error_settings');
        parent.classList.add('error_input');
        parent.after(errorDiv);
      } else {
        errorDiv.classList.add('error');
        value.classList.add('error_input');
        value.after(errorDiv);
      }
    }
  };

  const success = (value) => {
    count++;
    const errorDiv = document.getElementById(`error_${value.name}`);
    if (errorDiv) {
      errorDiv.remove();
      value.classList.remove('error_input');
    }
    value.classList.remove('error_input');
  };

  const el = form.elements;
  const inputs = [];

  const reEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const reLogin = /^[\w-]{3,20}$/;
  const reNameAndSurname = /^[A-ZА-Я][A-ZА-Яa-zа-я-]+$/;
  const rePhone = /^(?:\+|[+7|8])[\d]{10,15}$/;
  const rePassword = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/;

  Object.entries(data).forEach((element) => {
    const [key, ] = element;
    if (key === el[key].name) {
      inputs.push(el[key]);
    }
  });
  let newPassword = '';
  let newPasswordRepeat = '';

  Object.entries(inputs).forEach(([, value]) => {
    if (value.name === 'email') {
      if (!reEmail.test(value.value)) {
        error(value, 'заполненно неверно');
      } else {
        success(value);
      }
    } else if (value.name === 'login') {
      if (!reLogin.test(value.value)) {
        error(value, 'должно содержать от 3 до 20 латинских букв, может содержать цифры, дефис, нижнее подчёркивание, без пробелов');
      } else {
        success(value);
      }
    } else if (value.name === 'first_name' || value.name === 'second_name') {
      if (!reNameAndSurname.test(value.value)) {
        error(value, 'должно содержать латиницу или кириллицу, первая буква должна быть заглавной, без пробелов и без цифр, допустим только дефис');
      } else {
        success(value);
      }
    } else if (value.name === 'phone') {
      if (!rePhone.test(value.value)) {
        error(value, 'должно содержать от 10 до 15 символов, состоять из цифр, может начинается с +');
      } else {
        success(value);
      }
    } else if (value.name === 'password' || value.name === 'oldPassword') {
      if (!rePassword.test(value.value)) {
        error(value, 'Пароль должно содержать от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра');
      } else {
        success(value);
      }
    } else if (value.name === 'display_name') {
      if (value.value.trim().length === 0) {
        error(value, 'должно содержать хотя бы один символ');
      } else {
        success(value);
      }
    } else if (value.name === 'newPassword') {
      if (!rePassword.test(value.value)) {
        error(value, 'Пароль должно содержать от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра');
      } else {
        newPassword = value.value;
        success(value);
      }
    } else if (value.name === 'newPasswordRepeat') {
      if (!rePassword.test(value.value)) {
        error(value, 'Пароль должно содержать от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра');
      } else {
        newPasswordRepeat = value.value;
        if (newPassword !== newPasswordRepeat) {
          error(value, 'Пароли не совпадают');
        } else {
          success(value);
        }
      }
    }
  });
  if (count === inputs.length) {
    result = true;
  }
  return result;
}
