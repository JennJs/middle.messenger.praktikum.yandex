import Block from '../../modules/block/Block'
import template from './tpl.hbs';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { Link } from '../../components/link';
import { validate } from '../../utils/validation'


export class LoginForm extends Block {
  constructor(props) {
    super('div', props);
  }
 
  init() {
    this.children.input_login = new Input({ 
		lable: 'Логин',
		input_name: 'login',
		input_type: 'text',
		input_id: 'login_log_in',
		input_placeholder: 'Логин',
		events: {
			blur: () => console.log('blur'),
			focus: () => console.log('focus'),
			change: (e) => this.valid(e),
		} 
	});
	this.children.input_password  = new Input({
		lable: 'Пароль',
		input_name: 'password',
		input_type: 'password',
		input_id: 'password_log_in',
		input_placeholder: 'Пароль',
		events: {
			blur: () => console.log('blur'),
			focus: () => console.log('focus'),
			change: (e) => this.valid(e)
		} 
	});
	this.children.button_log_in  = new Button({
		label: 'Войти', 
		events: {
			click: (e) => this.getFormValue(e)
		}, 
	});
	this.children.link_sign_in  = new Link({
		href: '/registration',
		clas: 'position_centr',
		link_title: 'Нет аккаунта?'
	});
  }
 
  render() {
	// console.log(this.children.input_login)
	this.children.button_log_in.getContent().classList.add('button_primary');
    return this.compile(template, this.props);
  }
}
