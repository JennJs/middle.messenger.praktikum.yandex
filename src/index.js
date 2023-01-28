
// const comp = Handlebars.compile(tpl);


// const pageSignIn = comp({
// 	page: signin_form({
// 		button: button( 'submit','button_signin', 'Зарегистрироваться', 'button_primary'), 
// 		link: link( '/login','Войти', 'position_centr'),
// 	    input1: input('Почта', 'email', 'email', 'email', 'Введите ваш email'),
// 	    input2: input('Логин', 'text', 'login', 'login', 'Введите ваш логин'),
// 	    input3: input('Имя', 'text', 'first_name', 'first_name', 'Введите ваше имя'),
// 	    input4: input('Фамилия', 'text', 'second_name', 'second_name', 'Введите вашу фамилию'),
// 	    input5: input('Телефон', 'tel', 'phone', 'phone', 'Введите ваш номер'),
// 		input6: input('Пароль', 'password', '', 'password', 'Введите ваш пароль')
// 	})
// });

// const pageLogin = comp({
// 	page: login_form({
// 		button: button( 'submit','button_login', 'Войти', 'button_primary'), 
// 		link: link( '/registration','Нет аккаунта?', 'position_centr'),
// 	    input1: input('Логин', 'text', 'login', 'login', 'Введите ваш логин'),
// 		input2: input('Пароль', 'password', '', 'password', 'Введите ваш пароль')
// 	})
// });

// const pageUserSettings = comp({
// 	page: user_settings({ 
// 		comeback_nav: comeback(left_arrow),
// 		first_name: 'Jenn',
// 		avatar: avatar(avatar_img),
// 		user_setting_component_email: setting_component('Почта', 'email', 'email', 'user_email', 'jenn-m@yandex.ru', 'disabled'),
// 		user_setting_component_login: setting_component('Логин', 'text', 'login', 'user_login','jenn', 'disabled'),
// 		user_setting_component_name: setting_component('Имя', 'text', 'first_name', 'user_first_name', 'Evgeniia', 'disabled'),
// 		user_setting_component_surname: setting_component('Фамилия', 'text', 'second_name', 'user_second_name', 'Migda', 'disabled'),
// 		user_setting_component_name_inchat: setting_component('Имя в чате', 'text', 'display_name', 'user_display_name', 'Jenn', 'disabled'),
// 		user_setting_component_phone: setting_component('Телефон', 'tel', 'phone', 'user_phone', '89110000000', 'disabled'),
//         link_change_data: link( '/userSettings/change-data','Изменить данные', 'position_left'),
// 		link_change_pass: link( '/userSettings/change-password','Изменить пароль', 'position_left'),
// 		link_logout: link( '/login','Выйти', 'position_left', 'color:red')
// 	})	
// });

// const pageUserChangeData = comp({
// 	page: change_data({ 
// 		comeback_nav: comeback(left_arrow),
// 		avatar: avatar(),
// 		user_setting_component_email: setting_component('Почта', 'email', 'email', 'user_email', 'jenn-m@yandex.ru'),
// 		user_setting_component_login: setting_component('Логин', 'text', 'login', 'user_login', 'jenn'),
// 		user_setting_component_name: setting_component('Имя', 'text', 'first_name', 'user_first_name', 'Evgeniia'),
// 		user_setting_component_surname: setting_component('Фамилия', 'text', 'second_name', 'user_second_name', 'Migda'),
// 		user_setting_component_name_inchat: setting_component('Имя в чате', 'text', 'display_name', 'user_display_name', 'Jenn'),
// 		user_setting_component_phone: setting_component('Телефон', 'tel', 'phone', 'user_phone', '89110000000'),
// 		button: button('submit', 'change_user_data', 'Сохранить', 'button_primary')
// 	})	
// });

// const pageUserChangePassword = comp({
// 	page: change_password({ 
// 		comeback_nav: comeback(left_arrow),
// 		avatar: avatar(),
// 		user_setting_component_old_pass: setting_component('Старый пароль', 'password', 'oldPassword', 'user_password', '123'),
// 		user_setting_component_new_pass: setting_component('Новый пароль', 'password', 'newPassword', 'new_user_password'),
// 		user_setting_component_new_pass_repeat: setting_component('Повторите новый пароль', 'password', 'newPasswordRepeat', 'user_password_repeat'),
// 		button: button('submit', 'change_user_pass', 'Сохранить', 'button_primary')
// 	})	
// });

// const page500 = comp({
// 	page: page_500({ 
// 		link: link('/', 'Назад к чатам')
// 	})	
// });

// const page404 = comp({
// 	page: page_404({ 
// 		link: link('/', 'Назад к чатам')
// 	})	
// });

// const chatsHeader = comp({
// 	chats_header: chat_header('Jenn', search)	
// });

// const pageChats = comp({
// 	page: chats({
// 		header_chats: chat_header('Jenn', search),	
// 		message_window: message_window() 
// 	})
// });

// const buttonTest = comp({
// 	page: button('submit','button_login', 'Войти', 'button_primary')	
// });

// document.getElementById('root').innerHTML = router();

//  export  {
// 	pageChats,
// 	chatsHeader,
// 	page404,
// 	page500,
// 	pageUserChangePassword,
// 	pageUserChangeData,
// 	pageUserSettings,
// 	pageLogin,
// 	pageSignIn,
// 	buttonTest
// };

// document.getElementById('root').innerHTML = router();


import './style.css';
import { Page404 }  from './pages/404';
import style from './pages/500/style.css'
import { Page500 }  from './pages/500';
import { Chats }  from './pages/chats';
import { LoginForm }  from './pages/loginForm';
import styles from './pages/signInForm/style.css'
import { SignInForm }  from './pages/signInForm';
import { UserChangeData } from './pages/userChangeData';
import { UserChangePassword } from './pages/userChangePassword';
import { UserSettingsPage } from './pages/userSettings';
import { router } from './utils/router';


  const page404 = new Page404({});
  export const contPage404 = page404.getContent();
  contPage404.classList.add('conteiner_500')
  page404.dispatchComponentDidMount();
// console.log( contPage404);

  const page500 = new Page500({});
  export const contPage500 = page500.getContent();
  contPage500.classList.add('conteiner_500');
  page500.dispatchComponentDidMount();

  const chats= new Chats({});
  export const contChats = chats.getContent();
  contChats.classList.add('messenger')
  chats.dispatchComponentDidMount();

  const loginForm= new LoginForm({});
  export const contloginForm = loginForm.getContent();
  contloginForm.classList.add('login_form_conteiner')
  loginForm.dispatchComponentDidMount();

  const signInForm= new SignInForm({});
  export const contSignInForm = signInForm.getContent();
  contSignInForm.classList.add('login_form_conteiner')
  signInForm.dispatchComponentDidMount();

  const userChangeData= new UserChangeData({});
  export const contUserChangeData = userChangeData.getContent();
  contUserChangeData.classList.add('settings')
  userChangeData.dispatchComponentDidMount();

  const userChangePassword = new UserChangePassword({});
  export const contUserChangePassword = userChangePassword.getContent();
  userChangePassword.dispatchComponentDidMount();

  const userSettingsPage = new UserSettingsPage({
    first_name: 'Jenn'
  });
  export const contUserSettingsPage = userSettingsPage.getContent();
  userSettingsPage.dispatchComponentDidMount();

window.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#root');
  

  root.append(router());

});

