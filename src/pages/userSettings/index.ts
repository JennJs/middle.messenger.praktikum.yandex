import Block, {T} from '../../modules/block/Block';
import template from './tpl.hbs';
import { Link } from '../../components/link';
import { ComeBack } from '../../components/comeBack';
import left_arrow from '../../../static/left-arrow.png';
import { Avatar } from '../../components/avatar';
import './style.css';
import { Label } from '../../components/label';
import { Input } from '../../components/input';

export class UserSettingsPage extends Block<T> {
  constructor(props: T) {
    super('div', props);
  }

  init() {
    this.children.comeback_nav = new ComeBack({
      url: left_arrow,
    });
    this.children.avatar = new Avatar({});
    this.children.user_setting_email_label = new Label({});
    this.children.user_setting_email_input = new Input({});
    this.children.user_setting_login_label = new Label({});
    this.children.user_setting_login_input = new Input({});
    this.children.user_setting_name_label = new Label({});
    this.children.user_setting_name_input = new Input({});
    this.children.user_setting_surname_label = new Label({});
    this.children.user_setting_surname_input = new Input({});
    this.children.user_setting_name_inchat_label = new Label({});
    this.children.user_setting_name_inchat_input = new Input({});
    this.children.user_setting_phone_label = new Label({});
    this.children.user_setting_phone_input = new Input({});
    this.children.link_change_data = new Link({
      href: '/userSettings/change-data',
      link_title: 'Изменить данные',
      clas: 'position_left',
    });
    this.children.link_change_pass = new Link({
      href: '/userSettings/change-password',
      link_title: 'Изменить пароль',
      clas: 'position_left',
    });
    this.children.link_logout = new Link({
      href: '/login',
      link_title: 'Выйти',
      clas: 'position_left',
      style: 'color:red',
    });

    this.setInputsAttributes(this.children.user_setting_email_input.getContent(), 'email_user_settings', 'email', 'email', '', 'jenn-m@yandex.ru');
    this.children.user_setting_email_input.getContent().setAttribute('disabled', '');
    this.children.user_setting_email_input.getContent().classList.add('user_settings');
    this.setLabelsAttributes(this.children.user_setting_email_label, 'Почта', 'email_user_settings');

    this.setInputsAttributes(this.children.user_setting_login_input.getContent(), 'login_user_settings', 'login', 'text', '', 'jenn-m');
    this.children.user_setting_login_input.getContent().setAttribute('disabled', '');
    this.children.user_setting_login_input.getContent().classList.add('user_settings');
    this.setLabelsAttributes(this.children.user_setting_login_label, 'Логин', 'login_user_settings');

    this.setInputsAttributes(this.children.user_setting_name_input.getContent(), 'name_user_settings', 'first_name', 'text', '', 'Jenn');
    this.children.user_setting_name_input.getContent().setAttribute('disabled', '');
    this.children.user_setting_name_input.getContent().classList.add('user_settings');
    this.setLabelsAttributes(this.children.user_setting_name_label, 'Имя', 'name_user_settings');

    this.setInputsAttributes(this.children.user_setting_surname_input.getContent(), 'surname_user_settings', 'second_name', 'text', '', 'Migda');
    this.children.user_setting_surname_input.getContent().setAttribute('disabled', '');
    this.children.user_setting_surname_input.getContent().classList.add('user_settings');
    this.setLabelsAttributes(this.children.user_setting_surname_label, 'Фамилия', 'surname_user_settings');

    this.setInputsAttributes(this.children.user_setting_name_inchat_input.getContent(), 'display_name_user_settings', 'display_name', 'text', '', 'Jenn');
    this.children.user_setting_name_inchat_input.getContent().setAttribute('disabled', '');
    this.children.user_setting_name_inchat_input.getContent().classList.add('user_settings');
    this.setLabelsAttributes(this.children.user_setting_name_inchat_label, 'Имя в чате', 'display_name_user_settings');

    this.setInputsAttributes(this.children.user_setting_phone_input.getContent(), 'phone_user_settings', 'phone', 'tel', '', '+79110000000');
    this.children.user_setting_phone_input.getContent().setAttribute('disabled', '');
    this.children.user_setting_phone_input.getContent().classList.add('user_settings');
    this.setLabelsAttributes(this.children.user_setting_phone_label, 'Телефон', 'phone_user_settings');
  }

  render() {
    this.getContent().classList.add('settings');
    this.children.comeback_nav.getContent().classList.add('comeback');
    return this.compile(template, this.props);
  }
}
