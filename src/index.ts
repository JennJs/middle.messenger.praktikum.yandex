import './style.css';
import { Page404 } from './pages/404';
import  './pages/500/style.css';
import { Page500 } from './pages/500';
import { Chats } from './pages/chats';
import { LoginForm } from './pages/loginForm';
import './pages/signInForm/style.css';
import { SignInForm } from './pages/signInForm';
import { UserChangeData } from './pages/userChangeData';
import { UserChangePassword } from './pages/userChangePassword';
import { UserSettingsPage } from './pages/userSettings';
import { router } from './utils/router';

const page404 = new Page404({});
export const contPage404 = page404.getContent();
contPage404.classList.add('conteiner_500');
page404.dispatchComponentDidMount();

const page500 = new Page500({});
export const contPage500 = page500.getContent();
contPage500.classList.add('conteiner_500');
page500.dispatchComponentDidMount();

const chats = new Chats({});
export const contChats = chats.getContent();
contChats.classList.add('messenger');
chats.dispatchComponentDidMount();

const loginForm = new LoginForm({});
export const contloginForm = loginForm.getContent();
contloginForm.classList.add('login_form_conteiner');
loginForm.dispatchComponentDidMount();

const signInForm = new SignInForm({

});
export const contSignInForm = signInForm.getContent();
contSignInForm.classList.add('login_form_conteiner');
signInForm.dispatchComponentDidMount();

const userChangeData = new UserChangeData({});
export const contUserChangeData = userChangeData.getContent();
contUserChangeData.classList.add('settings');
userChangeData.dispatchComponentDidMount();

const userChangePassword = new UserChangePassword({});
export const contUserChangePassword = userChangePassword.getContent();
userChangePassword.dispatchComponentDidMount();

const userSettingsPage = new UserSettingsPage({
  first_name: 'Jenn',
});
export const contUserSettingsPage = userSettingsPage.getContent();
userSettingsPage.dispatchComponentDidMount();

window.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#root') as  Element;
  root.append(router());
});

