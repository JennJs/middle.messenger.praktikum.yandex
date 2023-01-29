import Block from '../../modules/block/Block'
import template from './tpl.hbs';
import { Button } from '../../components/button';
import { ComeBack } from '../../components/comeBack';
import left_arrow  from '../../../static/left-arrow.png';
import { Avatar } from '../../components/avatar';
import './style.css';
import { UserSettings } from '../../components/userSetting';


export class UserChangePassword extends Block {
  constructor(props) {
    super('div', props);
  }
 
  init() {
	this.children.comeback_nav = new ComeBack({ 
		url: left_arrow
	});
    this.children.avatar = new Avatar({});
	this.children.change_pass_component_old_pass = new UserSettings({ 
		lable: 'Старый пароль',
		input_name: 'oldPassword',
		input_type: 'password',
		input_id: 'change_pass_old_pass',
		input_value: '123'
	});
	this.children.change_pass_component_new_pass = new UserSettings({ 
		lable: 'Новый пароль',
		input_name: 'newPassword',
		input_type: 'password',
		input_id: 'change_pass_new_pass',
	});
	this.children.change_pass_component_new_pass_repeat = new UserSettings({ 
		lable: 'Повторите новый пароль',
		input_name: 'newPasswordRepeat',
		input_type: 'password',
		input_id: 'change_pass_new_pass_repeat',
	});
	this.children.button_save  = new Button({
		label: 'Сохранить', 
		events: {
			click: (e) => this.getFormValue(e),
		  }, 
	});
  }
 
  render() {
	this.getContent().classList.add('settings');
	this.children.comeback_nav.getContent().classList.add('comeback');
	this.children.button_save.getContent().classList.add('button_primary');
    return this.compile(template, this.props);
  }
}
