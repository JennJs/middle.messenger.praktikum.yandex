
// const comp = Handlebars.compile(tpl);
// console.log(Button);
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

import { Button }  from './components/button';
import { Avatar }  from './components/avatar';
import { ChatHeader }  from './components/chatHeader';
import search from "../static/search.png";
import { ComeBack }  from './components/comeBack';
import left_arrow from '../static/left-arrow.png';
import './style.css';
import { Input }  from './components/input';
import { Link }  from './components/link';
import { UserSettings }  from './components/userSetting';


window.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#root');

  const button = new Button({ 
    label: 'click', 
    events: {
      click: () => console.log('clicked'),
    }, 
  });

  const contButton = button.getContent();
  contButton.classList.add('button_primary');
  contButton.setAttribute('id', 'button_submit');
  button.dispatchComponentDidMount();


  const avatar = new Avatar({});
  const contAvatar = avatar.getContent();
  contAvatar.classList.add('avatar_conteiner');
  avatar.dispatchComponentDidMount();

  const chatHeader = new ChatHeader({ 
    name: 'Jenn', 
    url: search, 
  });
  const contChatHeader = chatHeader.getContent();
  contChatHeader.classList.add('chats_header_conteiner');
  chatHeader.dispatchComponentDidMount();

  const comeBack = new ComeBack({ 
    url: left_arrow, 
  });
  const contComeBack = comeBack.getContent();
  contComeBack.classList.add('comeback');
  comeBack.dispatchComponentDidMount();

  const input = new Input({ 
    lable: 'Логин',
    input_name: 'login',
    input_type: 'text',
    input_id: 'login_signIn',
    input_placeholder: 'Логин'
  });
  const contInput = input.getContent();
  input.dispatchComponentDidMount();

  const link = new Link({});
  const contLink = link.getContent();
  link.setAttributes(contLink, {"href": "/login", 'class': "position_centr"});
  contLink.textContent="Войти"
  link.dispatchComponentDidMount();

  const userSettings = new UserSettings({
    lable: 'Имя',
    input_name: 'first_name',
    input_type: 'text',
    input_id: 'user_first_name',
    input_value: 'Evgeniia',
    state: 'disabled'
  });
  const contUserSettings = userSettings.getContent();
  contUserSettings.classList.add('user_settings_conteiner');
  userSettings.dispatchComponentDidMount();

  root.append(contUserSettings);


});

// import { HomePage } from './pages/home/index';
// import { Button } from './components/button/index';

// window.addEventListener('DOMContentLoaded', () => {
//   const root = document.querySelector('#root');
//   console.log(root);

//   const homePage = new HomePage({ title: 'Home page' });

//   console.log(HomePage);
//   const content = homePage.getContent();
//   console.log(content);


//   root.append(homePage.getContent());

//   homePage.dispatchComponentDidMount();
// });

