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
import { getFormValue } from './utils/getFormValue';
import { router } from './modules/router/Router';
import { route } from './utils/navigation';
import { authController } from './controllers/AuthController';
import { store } from './utils/Store';
import ChatsController from './controllers/ChatsController';

export const page404 = new Page404({
  events: {
    click : (e: Event &{ target: HTMLElement}) => route(e)
  }
});
export const contPage404: HTMLElement = page404.getContent();
contPage404.classList.add('conteiner_500');

export const page500 = new Page500({
  events: {
    click : (e: Event &{ target: HTMLElement}) => route(e)
  }
});
export const contPage500: HTMLElement = page500.getContent();
contPage500.classList.add('conteiner_500');

export const chats = new Chats({
  events: {
    click : (e: Event & {target: any , parentNode: HTMLElement}) => route(e)
  }
});
export const contChats: HTMLElement = chats.getContent();
contChats.classList.add('messenger');

export const loginForm = new LoginForm({
  events: {
    submit: (e) => getFormValue(e),
  }
});
export const contloginForm: HTMLElement = loginForm.getContent();
contloginForm.setAttribute('id', 'login_form');
contloginForm.setAttribute('action', '#');
contloginForm.setAttribute('method', 'post');

export const signInForm = new SignInForm({
  events: {
    submit: (e) => getFormValue(e),
  }
});
export const contSignInForm: HTMLElement = signInForm.getContent();
contSignInForm.setAttribute('id', 'signin_form');
contSignInForm.setAttribute('method', 'post');

export const userChangeData = new UserChangeData({});
export const contUserChangeData: HTMLElement = userChangeData.getContent();
contUserChangeData.classList.add('settings');

export const userChangePassword = new UserChangePassword({});
export const contUserChangePassword: HTMLElement = userChangePassword.getContent();

export const userSettingsPage = new UserSettingsPage({});
export const contUserSettingsPage: HTMLElement = userSettingsPage.getContent();


window.addEventListener('DOMContentLoaded', async () => {
  
  await authController.fetchUser();

  if(store._state.user && window.location.pathname === '/') {
    await ChatsController.getChats(); 
    router.go('/');
    router.use('/login', loginForm)
      .use('/', chats) 
      .use('/registration', signInForm) 
      .use('/userSettings', userSettingsPage)
      .use('/userSettings/change-data', userChangeData) 
      .use('/userSettings/change-password', userChangePassword)
      .use('/500', page500) 
      .use('/404', page404)
    router.start();
  } else if (!store._state.user && window.location.pathname === '/registration') {
    router.use('/registration', signInForm)
          .use('/login', loginForm)
    router.start();
  }else if (store._state.user && window.location.pathname === '/login') {
    await ChatsController.getChats(); 
    router.start();
    router.use('/login', loginForm)
      .use('/', chats) 
      .use('/registration', signInForm) 
      .use('/userSettings', userSettingsPage)
      .use('/userSettings/change-data', userChangeData) 
      .use('/userSettings/change-password', userChangePassword)
      .use('/500', page500) 
      .use('/404', page404)
  } else if (!store._state.user) {
    router.go('/login')
    router.use('/registration', signInForm)
          .use('/login', loginForm)
    router.start();
  } else if (store._state.user && window.location.pathname === '/registration') {
    await ChatsController.getChats(); 
    router.go('/');
    router.use('/login', loginForm)
      .use('/', chats) 
      .use('/registration', signInForm) 
      .use('/userSettings', userSettingsPage)
      .use('/userSettings/change-data', userChangeData) 
      .use('/userSettings/change-password', userChangePassword)
      .use('/500', page500) 
      .use('/404', page404)
    router.start();
   } else if (store._state.user) {
    await ChatsController.getChats(); 
    router.use('/login', loginForm)
      .use('/', chats) 
      .use('/registration', signInForm) 
      .use('/userSettings', userSettingsPage)
      .use('/userSettings/change-data', userChangeData) 
      .use('/userSettings/change-password', userChangePassword)
      .use('/500', page500) 
      .use('/404', page404)
    router.start();
  }
});


   
