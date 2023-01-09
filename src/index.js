import Handlebars from "handlebars";
import tpl from 'bundle-text:./index.hbs';
import './style.css';
import button from './components/button';
import page2 from './pages/page2';
import login_form from "./pages/login_form";
import input from "./components/input";

// console.log(tpl);


const comp = Handlebars.compile(tpl);
// console.log(comp);
const res = comp({
	fname: 'students',
	btn: button('btn1','Click this', ),
	page_login: login_form({
		button: button( 'button1', 'Войти', 'button_primary'), 
	    input1: input('Логин', 'text', 'login', 'login', 'Введите ваш логин'),
	    input2: input('Пароль', 'password', '', 'password', 'Введите ваш пароль')}),
		
	page2: page2({button: button( 'button2', 'link', 'button_secondary')})

});

document.getElementById('root').innerHTML = res;

// document.getElementById('root').querySelector('a').addEventListener('click', (e) => {

// })

window.createButton = (id, value) => {

	const htmlTpl = document.createElement('template');
	htmlTpl.innerHTML = button(id,value);

	document.getElementById('root').appendChild(htmlTpl.content);
}
