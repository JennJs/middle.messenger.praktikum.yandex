import Block from '../../modules/block/Block'
import template from './tpl.hbs';
import { Button } from '../../components/button';
import { ComeBack } from '../../components/comeBack';
import left_arrow  from '../../../static/left-arrow.png';
import { Avatar } from '../../components/avatar';
import './style.css';
import { UserSettings } from '../../components/userSetting';


export class UserChangeData extends Block {
  constructor(props) {
    super('div', props);
  }
 
  init() {
	this.children.comeback_nav = new ComeBack({ 
		url: left_arrow
	});
    this.children.avatar = new Avatar({});
	this.children.user_setting_component_email = new UserSettings({ 
		lable: 'Почта',
		input_name: 'email',
		input_type: 'email',
		input_id: 'email_user_change_data',
		input_value: 'jenn-m@yandex.ru' 
	});
	this.children.user_setting_component_login = new UserSettings({ 
		lable: 'Логин',
		input_name: 'login',
		input_type: 'text',
		input_id: 'login_user_change_data',
		input_value: 'jenn-m' 
	});
	this.children.user_setting_component_name = new UserSettings({ 
		lable: 'Имя',
		input_name: 'first_name',
		input_type: 'text',
		input_id: 'first_name_user_change_data',
		input_value: 'Jenn' 
	});
	this.children.user_setting_component_surname = new UserSettings({ 
		lable: 'Фамилия',
		input_name: 'second_name',
		input_type: 'text',
		input_id: 'second_name_user_change_data',
		input_value: 'Migda' 
	});
	this.children.user_setting_component_name_inchat = new UserSettings({ 
		lable: 'Имя в чате',
		input_name: 'display_name',
		input_type: 'text',
		input_id: 'display_name_user_change_data',
		input_value: 'Jenn' 
	});
	this.children.user_setting_component_phone = new UserSettings({ 
		lable: 'Телефон',
		input_name: 'phone',
		input_type: 'tel',
		input_id: 'phone_user_change_data',
		input_value: '+79110000000' 
	});
	this.children.button_save  = new Button({
		label: 'Сохранить', 
		events: {
			click: () => console.log('clicked'),
		  }, 
	});
  }
  
 
  render() {
	console.log(this.children);
	this.children.comeback_nav.getContent().classList.add('comeback');
	this.children.button_save.getContent().classList.add('button_primary');
    return this.compile(template, this.props);
  }
}
