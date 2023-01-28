import Block from '../../modules/block/Block'
import template from './tpl.hbs';
import { Link } from '../../components/link';
import { ComeBack } from '../../components/comeBack';
import left_arrow  from '../../../static/left-arrow.png';
import { Avatar } from '../../components/avatar';
import './style.css';
import { UserSettings } from '../../components/userSetting';


export class UserSettingsPage extends Block {
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
		input_value: 'jenn-m@yandex.ru',
		state: 'disabled' 
	});
	this.children.user_setting_component_login = new UserSettings({ 
		lable: 'Логин',
		input_name: 'login',
		input_type: 'text',
		input_id: 'login_user_change_data',
		input_value: 'jenn-m',
		state: 'disabled' 
	});
	this.children.user_setting_component_name = new UserSettings({ 
		lable: 'Имя',
		input_name: 'first_name',
		input_type: 'text',
		input_id: 'first_name_user_change_data',
		input_value: 'Jenn',
		state: 'disabled' 
	});
	this.children.user_setting_component_surname = new UserSettings({ 
		lable: 'Фамилия',
		input_name: 'second_name',
		input_type: 'text',
		input_id: 'second_name_user_change_data',
		input_value: 'Migda',
		state: 'disabled' 
	});
	this.children.user_setting_component_name_inchat = new UserSettings({ 
		lable: 'Имя в чате',
		input_name: 'display_name',
		input_type: 'text',
		input_id: 'display_name_user_change_data',
		input_value: 'Jenn',
		state: 'disabled' 
	});
	this.children.user_setting_component_phone = new UserSettings({ 
		lable: 'Телефон',
		input_name: 'phone',
		input_type: 'tel',
		input_id: 'phone_user_change_data',
		input_value: '+79110000000' ,
		state: 'disabled'
	});
	this.children.link_change_data  = new Link({
		href: '/userSettings/change-data', 
		link_title: 'Изменить данные',
		clas: 'position_left'
	});
	this.children.link_change_pass  = new Link({
		href: '/userSettings/change-password', 
		link_title: 'Изменить пароль',
		clas: 'position_left'
	});
	this.children.link_logout  = new Link({
		href: '/login', 
		link_title: 'Выйти',
		clas: 'position_left',
		style: 'color:red'
	});
  }
 
  render() {
	console.log(this.children);
	this.getContent().classList.add('settings');
	this.children.comeback_nav.getContent().classList.add('comeback');
    return this.compile(template, this.props);
  }
}
