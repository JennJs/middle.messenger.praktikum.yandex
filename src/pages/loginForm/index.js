import Block from '../../modules/block/Block'
import template from './tpl.hbs';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { Link } from '../../components/link';
import { validate } from '../../utils/validation'
import { Label } from '../../components/label';


export class LoginForm extends Block {
  constructor(props) {
    super('div', props);
  }
 
  init() {
	this.children.input_login_label = new Label({});
    this.children.input_login = new Input({ 
		events: {
			blur: (e) => this.valid(e),
			focus: (e) => this.focus(e),
		} 
	});
	this.children.input_password_label = new Label({});
	this.children.input_password  = new Input({
		events: {
			blur: (e) => this.valid(e),
			focus: (e) => this.focus(e),
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
	this.setLabelsAttributes(this.children.input_login_label, 'Логин', 'login_log_in' );
	this.setInputsAttributes(this.children.input_login.getContent(),'login_log_in', 'login', 'text', 'Логин');
	this.setLabelsAttributes(this.children.input_password_label, 'Пароль', 'password_log_in' );
	this.setInputsAttributes(this.children.input_password.getContent(),'password_log_in', 'password', 'password', 'Пароль' );

	this.children.button_log_in.getContent().classList.add('button_primary');
  }


  render() {
    return this.compile(template, this.props);
  }
}
