import Block from '../../modules/block/Block'
import template from './tpl.hbs';
import { Button } from '../../components/button';
import { ComeBack } from '../../components/comeBack';
import left_arrow  from '../../../static/left-arrow.png';
import { Avatar } from '../../components/avatar';
import './style.css';
import { Label } from '../../components/label';
import { Input } from '../../components/input';


export class UserChangePassword extends Block {
  constructor(props) {
    super('div', props);
  }
 
  init() {
	this.children.comeback_nav = new ComeBack({ 
		url: left_arrow
	});
    this.children.avatar = new Avatar({});
	this.children.change_pass_old_pass_label = new Label();
	this.children.change_pass_old_pass_input = new Input({
		events: {
			blur: (e) => this.valid(e),
			focus: (e) => this.focus(e),
		} 
	});
	this.children.change_pass_new_pass_label = new Label();
	this.children.change_pass_new_pass_input = new Input({
		events: {
			blur: (e) => this.valid(e),
			focus: (e) => this.focus(e),
		} 
	});
	this.children.change_pass_new_pass_repeat_label = new Label();
	this.children.change_pass_new_pass_repeat_input = new Input({
		events: {
			blur: (e) => this.valid(e),
			focus: (e) => this.focus(e),
		} 
	});
	this.children.button_save  = new Button({
		label: 'Сохранить', 
		events: {
			click: (e) => this.getFormValue(e),
		  }, 
	});

   this.setInputsAttributes(this.children.change_pass_old_pass_input.getContent(), 'change_pass_old_pass', 'oldPassword', 'password', '', '123Jfhfrr5');
   this.children.change_pass_old_pass_input.getContent().classList.add('user_settings');
   this.setLabelsAttributes(this.children.change_pass_old_pass_label, 'Старый пароль',  'change_pass_old_pass' );

   this.setInputsAttributes(this.children.change_pass_new_pass_input.getContent(), 'change_pass_new_pass', 'newPassword', 'password', '', '');
   this.children.change_pass_new_pass_input.getContent().classList.add('user_settings');
   this.setLabelsAttributes(this.children.change_pass_new_pass_label, 'Новый пароль',  'change_pass_new_pass' );

   this.setInputsAttributes(this.children.change_pass_new_pass_repeat_input.getContent(), 'change_pass_new_pass_repeat', 'newPasswordRepeat', 'password', '', '');
   this.children.change_pass_new_pass_repeat_input.getContent().classList.add('user_settings');
   this.setLabelsAttributes(this.children.change_pass_new_pass_repeat_label, 'Повторите новый пароль',  'change_pass_new_pass_repeat' );
  }
 
  render() {
	this.getContent().classList.add('settings');
	this.children.comeback_nav.getContent().classList.add('comeback');
	this.children.button_save.getContent().classList.add('button_primary');
    return this.compile(template, this.props);
  }
}
