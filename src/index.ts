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
// import { router } from './utils/router';
import { getFormValue } from './utils/getFormValue';
import Router from './modules/router/Router';
import route from './utils/navigation';

const page404 = new Page404({
  events: {
    click : (e: Event) => route(e)
  }
});
export const contPage404: HTMLElement = page404.getContent();
contPage404.classList.add('conteiner_500');
// page404.dispatchComponentDidMount();

const page500 = new Page500({
  events: {
    click : (e: Event) => route(e)
  }
});
export const contPage500: HTMLElement = page500.getContent();
contPage500.classList.add('conteiner_500');
// page500.dispatchComponentDidMount();

const chats = new Chats({
  events: {
    click : (e: Event) => route(e)
  }
});
export const contChats: HTMLElement = chats.getContent();
contChats.classList.add('messenger');
// chats.dispatchComponentDidMount();

const loginForm = new LoginForm({
  events: {
    submit: (e) => getFormValue(e),
  }
});
export const contloginForm: HTMLElement = loginForm.getContent();
contloginForm.setAttribute('id', 'login_form');
contloginForm.setAttribute('action', '#');
contloginForm.setAttribute('method', 'post');
// loginForm.dispatchComponentDidMount();

const signInForm = new SignInForm({
  events: {
    submit: (e) => getFormValue(e),
  }
});
export const contSignInForm: HTMLElement = signInForm.getContent();
contSignInForm.setAttribute('id', 'signin_form');
contSignInForm.setAttribute('action', '#');
contSignInForm.setAttribute('method', 'post');
// signInForm.dispatchComponentDidMount();

const userChangeData = new UserChangeData({
    // events: {
    //   click : (e: Event) => route(e)
    // }
});
export const contUserChangeData: HTMLElement = userChangeData.getContent();
contUserChangeData.classList.add('settings');
// userChangeData.dispatchComponentDidMount();

const userChangePassword = new UserChangePassword({
  // events: {
  //   click : (e: Event) => route(e)
  // }
});
export const contUserChangePassword: HTMLElement = userChangePassword.getContent();
// userChangePassword.dispatchComponentDidMount();

const userSettingsPage = new UserSettingsPage({
  first_name: 'Jenn',
  // events: {
  //   click : (e: Event) => route(e)
  // }
});
export const contUserSettingsPage: HTMLElement = userSettingsPage.getContent();
// userSettingsPage.dispatchComponentDidMount();


// window.addEventListener('DOMContentLoaded', () => {
  // const root = document.querySelector('#root') as  Element;
  // root.append(router()); 

const router = new Router('#root');
// console.log('router from index:', router);
// router
//   .use('/', chats) 
// 	.use('/login', contloginForm)
//   .use('/registration', contSignInForm) 
// 	.use('/userSettings', contUserSettingsPage)
//   .use('/userSettings/change-data', contUserChangeData) 
// 	.use('/userSettings/change-password', contUserChangePassword)
//   .use('/500', contPage500) 
// 	.use('/404', contPage404)
// 	.start();

router
  .use('/', chats) 
	.use('/login', loginForm)
  .use('/registration', signInForm) 
	.use('/userSettings', userSettingsPage)
  .use('/userSettings/change-data', userChangeData) 
	.use('/userSettings/change-password', userChangePassword)
  .use('/500', page500) 
	.use('/404', page404)
	.start();

// });

