import Handlebars from "handlebars";
import tpl from 'bundle-text:./index.hbs';
import './style.css';
import button from './components/button';
import page2 from './pages/page2';
import signin_form from "./pages/signin_form";
import input from "./components/input";

// console.log(tpl);


const comp = Handlebars.compile(tpl);
// console.log(comp);
const res = comp({
	fname: 'students',
	btn: button('btn1','Click this', ),
	page_signin: signin_form({
		button: button( 'submit','button_signin', 'Зарегистрироваться', 'button_primary'), 
	    input1: input('Почта', 'email', 'email', 'email', 'Введите ваш email'),
	    input2: input('Логин', 'text', 'login', 'login', 'Введите ваш логин'),
	    input3: input('Имя', 'text', 'first_name', 'first_name', 'Введите ваше имя'),
	    input4: input('Фамилия', 'text', 'second_name', 'second_name', 'Введите вашу фамилию'),
	    input5: input('Телефон', 'tel', 'phone', 'phone', 'Введите ваш номер'),
		input6: input('Пароль', 'password', '', 'password', 'Введите ваш пароль')}),
	page2: page2({button: button('submit','button2', 'link', 'button_secondary')})

});

document.getElementById('root').innerHTML = res;

// document.getElementById('root').querySelector('a').addEventListener('click', (e) => {

// })

window.createButton = (id, value) => {

	const htmlTpl = document.createElement('template');
	htmlTpl.innerHTML = button(id,value);

	document.getElementById('root').appendChild(htmlTpl.content);
}
