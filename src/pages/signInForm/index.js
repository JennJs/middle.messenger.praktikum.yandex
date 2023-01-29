import Block from '../../modules/block/Block'
import template from './tpl.hbs';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { Link } from '../../components/link';



export class SignInForm extends Block {
  constructor(props) {
    super('div', props);
  }
  
  init() {
	this.children.input_email = new Input({ 
		lable: 'Почта',
		input_name: 'email',
		input_type: 'email',
		input_id: 'email_sign_in',
		input_placeholder: 'Почта' 
	});
    this.children.input_login = new Input({ 
		lable: 'Логин',
		input_name: 'login',
		input_type: 'text',
		input_id: 'login_sign_in',
		input_placeholder: 'Логин' 
	});
	this.children.input_name = new Input({ 
		lable: 'Имя',
		input_name: 'first_name',
		input_type: 'text',
		input_id: 'first_name_sign_in',
		input_placeholder: 'Имя' 
	});
	this.children.input_surname = new Input({ 
		lable: 'Фамилия',
		input_name: 'second_name',
		input_type: 'text',
		input_id: 'second_name_sign_in',
		input_placeholder: 'Фамилия' 
	});
	this.children.input_tel = new Input({ 
		lable: 'Телефон',
		input_name: 'phone',
		input_type: 'tel',
		input_id: 'phone_sign_in',
		input_placeholder: 'Ваш номер телефона' 
	});
	this.children.input_password  = new Input({
		lable: 'Пароль',
		input_name: 'password',
		input_type: 'password',
		input_id: 'password_sign_in',
		input_placeholder: 'Пароль' 
	});
	this.children.button_sign_in  = new Button({
		label: 'Зарегистрироваться',
		events: {
			click: (e) => this.getFormValue(e),
		}, 
	});
	this.children.link_log_in  = new Link({
		href: '/login',
		clas: 'position_centr',
		link_title: 'Войти'
	});
  }
  

  render() {
	this.children.button_sign_in.getContent().classList.add('button_primary');
    return this.compile(template, this.props);
  }
}
