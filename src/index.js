import Handlebars from "handlebars";
import tpl from 'bundle-text:./index.hbs';
import './style.css';
import button from './components/button';
import avatar from './components/avatar';
import signin_form from "./pages/signin_form";
import input from "./components/input";
import link from "./components/link";
import login_form from "./pages/login_form";
import comeback from "./components/comeBack";
import left_arrow from "../static/left-arrow.png";
import user_settings from "../src/pages/user_settings";
import setting_component from "../src/components/user_setting";
import '../src/components/link/style.css';
import change_data from '../src/pages/user_change_data';
import change_password from '../src/pages/user_change_password';
import page_500 from '../src/pages/500';
import page_404 from '../src/pages/404';
import '../src/pages/500/style.css';
import chat_header from '../src/components/chatHeader';



const comp = Handlebars.compile(tpl);

const pageSignIn = comp({
	page_signin: signin_form({
		button: button( 'submit','button_signin', 'Зарегистрироваться', 'button_primary'), 
		link: link( '#','Войти', 'position_centr'),
	    input1: input('Почта', 'email', 'email', 'email', 'Введите ваш email'),
	    input2: input('Логин', 'text', 'login', 'login', 'Введите ваш логин'),
	    input3: input('Имя', 'text', 'first_name', 'first_name', 'Введите ваше имя'),
	    input4: input('Фамилия', 'text', 'second_name', 'second_name', 'Введите вашу фамилию'),
	    input5: input('Телефон', 'tel', 'phone', 'phone', 'Введите ваш номер'),
		input6: input('Пароль', 'password', '', 'password', 'Введите ваш пароль')}),
});
const pageLogin = comp({
	page_login: signin_form({
		button: button( 'submit','button_login', 'Войти', 'button_primary'), 
		link: link( '#','Нет аккаунта?', 'position_centr'),
	    input1: input('Логин', 'text', 'login', 'login', 'Введите ваш логин'),
		input2: input('Пароль', 'password', '', 'password', 'Введите ваш пароль')}),
});
const pageUserSettings = comp({
	page_user_settings: user_settings({ 
		comeback_nav: comeback(left_arrow),
		first_name: 'Jenn',
		avatar: avatar(),
		user_setting_component_email: setting_component('Почта', 'email', 'email', 'user_email', 'jenn-m@yandex.ru', 'disabled'),
		user_setting_component_login: setting_component('Логин', 'text', 'login', 'user_login','jenn', 'disabled'),
		user_setting_component_name: setting_component('Имя', 'text', 'first_name', 'user_first_name', 'Evgeniia', 'disabled'),
		user_setting_component_surname: setting_component('Фамилия', 'text', 'second_name', 'user_second_name', 'Migda', 'disabled'),
		user_setting_component_name_inchat: setting_component('Имя в чате', 'text', 'display_name', 'user_display_name', 'Jenn', 'disabled'),
		user_setting_component_phone: setting_component('Телефон', 'tel', 'phone', 'user_phone', '89110000000', 'disabled'),
        link_change_data: link( '#','Изменить данные', 'position_left'),
        link: link( '#','Изменить данные', 'position_left'),
		link_change_pass: link( '#','Изменить пароль', 'position_left'),
		link_logout: link( '#','Выйти', 'position_left', 'color:red')
	})	
});
const pageUserChangeData = comp({
	page_user_change_data: change_data({ 
		comeback_nav: comeback(left_arrow),
		avatar: avatar(),
		user_setting_component_email: setting_component('Почта', 'email', 'email', 'user_email', 'jenn-m@yandex.ru'),
		user_setting_component_login: setting_component('Логин', 'text', 'login', 'user_login', 'jenn'),
		user_setting_component_name: setting_component('Имя', 'text', 'first_name', 'user_first_name', 'Evgeniia'),
		user_setting_component_surname: setting_component('Фамилия', 'text', 'second_name', 'user_second_name', 'Migda'),
		user_setting_component_name_inchat: setting_component('Имя в чате', 'text', 'display_name', 'user_display_name', 'Jenn'),
		user_setting_component_phone: setting_component('Телефон', 'tel', 'phone', 'user_phone', '89110000000'),
		button: button('submit', 'change_user_data', 'Сохранить', 'button_primary')
	})	
});
const pageUserChangePassword = comp({
	page_user_change_password: change_password({ 
		comeback_nav: comeback(left_arrow),
		avatar: avatar(),
		user_setting_component_old_pass: setting_component('Старый пароль', 'password', 'oldPassword', 'user_password', '123'),
		user_setting_component_new_pass: setting_component('Новый пароль', 'password', 'newPassword', 'new_user_password'),
		user_setting_component_new_pass_repeat: setting_component('Повторите новый пароль', 'password', 'newPasswordRepeat', 'user_password_repeat'),
		button: button('submit', 'change_user_pass', 'Сохранить', 'button_primary')
	})	
});
const page500 = comp({
	page_500: page_500({ 
		link: link('#', 'Назад к чатам')
	})	
});
const page404 = comp({
	page_404: page_404({ 
		link: link('#', 'Назад к чатам')
	})	
});
const chatsHeader = comp({
	chats_header: chat_header({ 
		name: 'Jenn',
		link: link('#', 'Назад к чатам'),
		left_arrow: comeback(left_arrow)
	})	
});
document.getElementById('root').innerHTML = chatsHeader;

// document.getElementById('root').querySelector('a').addEventListener('click', (e) => {

// })

// window.createButton = (id, value) => {

// 	const htmlTpl = document.createElement('template');
// 	console.log(htmlTpl);
// 	htmlTpl.innerHTML = button(id,value);

// 	document.getElementById('root').appendChild(htmlTpl.content);
// }
