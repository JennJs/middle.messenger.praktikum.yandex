import Block from '../../modules/block/Block';
import template from './tpl.hbs';
import { Button } from '../../components/button';
import { ComeBack } from '../../components/comeBack';
import left_arrow from '../../../static/left-arrow.png';
import { Avatar } from '../../components/avatar';
import './style.css';
import { Label } from '../../components/label';
import { Input } from '../../components/input';

export class UserChangeData extends Block {
  constructor(props) {
    super('div', props);
  }

  init() {
    this.children.comeback_nav = new ComeBack({
      url: left_arrow,
    });
    this.children.avatar = new Avatar({});
    this.children.avatar = new Avatar({});
    this.children.avatar = new Avatar({});
    this.children.user_setting_email_change_label = new Label();
    this.children.user_setting_email_change_input = new Input({
      events: {
        blur: (e) => this.valid(e),
        focus: (e) => this.focus(e),
      },
    });
    this.children.user_setting_login_change_label = new Label();
    this.children.user_setting_login_change_input = new Input({
      events: {
        blur: (e) => this.valid(e),
        focus: (e) => this.focus(e),
      },
    });
    this.children.user_setting_name_change_label = new Label();
    this.children.user_setting_name_change_input = new Input({
      events: {
        blur: (e) => this.valid(e),
        focus: (e) => this.focus(e),
      },
    });
    this.children.user_setting_surname_change_label = new Label();
    this.children.user_setting_surname_change_input = new Input({
      events: {
        blur: (e) => this.valid(e),
        focus: (e) => this.focus(e),
      },
    });
    this.children.user_setting_name_inchat_change_label = new Label();
    this.children.user_setting_name_inchat_change_input = new Input({
      events: {
        blur: (e) => this.valid(e),
        focus: (e) => this.focus(e),
      },
    });
    this.children.user_setting_phone_change_label = new Label();
    this.children.user_setting_phone_change_input = new Input({
      events: {
        blur: (e) => this.valid(e),
        focus: (e) => this.focus(e),
      },
    });
    this.children.button_save = new Button({
      label: 'Сохранить',
      events: {
        click: (e) => this.getFormValue(e),
		},
    });

    this.setInputsAttributes(this.children.user_setting_email_change_input.getContent(), 'email_user_settings_change', 'email', 'email', '', 'jenn-m@yandex.ru');
    this.children.user_setting_email_change_input.getContent().classList.add('user_settings');
    this.setLabelsAttributes(this.children.user_setting_email_change_label, 'Почта', 'email_user_settings_change');

    this.setInputsAttributes(this.children.user_setting_login_change_input.getContent(), 'login_user_settings', 'login', 'text', '', 'jenn-m');
    this.children.user_setting_login_change_input.getContent().classList.add('user_settings');
    this.setLabelsAttributes(this.children.user_setting_login_change_label, 'Логин', 'login_user_settings');

    this.setInputsAttributes(this.children.user_setting_name_change_input.getContent(), 'name_user_settings', 'first_name', 'text', '', 'Jenn');
    this.children.user_setting_name_change_input.getContent().classList.add('user_settings');
    this.setLabelsAttributes(this.children.user_setting_name_change_label, 'Имя', 'name_user_settings');

    this.setInputsAttributes(this.children.user_setting_surname_change_input.getContent(), 'surname_user_settings', 'second_name', 'text', '', 'Migda');
    this.children.user_setting_surname_change_input.getContent().classList.add('user_settings');
    this.setLabelsAttributes(this.children.user_setting_surname_change_label, 'Фамилия', 'surname_user_settings');

    this.setInputsAttributes(this.children.user_setting_name_inchat_change_input.getContent(), 'display_name_user_settings', 'display_name', 'text', '', 'Jenn');
    this.children.user_setting_name_inchat_change_input.getContent().classList.add('user_settings');
    this.setLabelsAttributes(this.children.user_setting_name_inchat_change_label, 'Имя в чате', 'display_name_user_settings');

    this.setInputsAttributes(this.children.user_setting_phone_change_input.getContent(), 'phone_user_settings', 'phone', 'tel', '', '+79110000000');
    this.children.user_setting_phone_change_input.getContent().classList.add('user_settings');
    this.setLabelsAttributes(this.children.user_setting_phone_change_label, 'Телефон', 'phone_user_settings');
  }

  render() {
    this.children.comeback_nav.getContent().classList.add('comeback');
    this.children.button_save.getContent().classList.add('button_primary');
    return this.compile(template, this.props);
  }
}
