import Block from '../../modules/block/Block';
import template from './tpl.hbs';
import { Avatar } from '../avatar';
import { Label } from '../label';
import { Input } from '../input';
import { Button } from '../button';
import { getFormValue } from '../../utils/getFormValue';
import store, { StoreEvents } from "../../utils/Store";
import { Link } from '../link';
import route from '../../utils/navigation';


type FormProps = {
  events:{ submit: (e: Event & { target: HTMLInputElement})=> void} 
}

export class FormChangeData extends Block<FormProps> {
  constructor(props: FormProps) {
    super('form', props);
  }
  init () {
    // this.children.avatar = new Avatar({});
    this.children.user_setting_email_change_label = new Label({});
    this.children.user_setting_email_change_input = new Input({
      events: {
        blur: (e) => this.valid(e),
        focus: (e) => this.focus(e),
      },
    });
    this.children.user_setting_login_change_label = new Label({});
    this.children.user_setting_login_change_input = new Input({
      events: {
        blur: (e) => this.valid(e),
        focus: (e) => this.focus(e),
      },
    });
    this.children.user_setting_name_change_label = new Label({});
    this.children.user_setting_name_change_input = new Input({
      events: {
        blur: (e) => this.valid(e),
        focus: (e) => this.focus(e),
      },
    });
    this.children.user_setting_surname_change_label = new Label({});
    this.children.user_setting_surname_change_input = new Input({
      events: {
        blur: (e) => this.valid(e),
        focus: (e) => this.focus(e),
      },
    });
    this.children.user_setting_name_inchat_change_label = new Label({});
    this.children.user_setting_name_inchat_change_input = new Input({
      events: {
        blur: (e) => this.valid(e),
        focus: (e) => this.focus(e),
      },
    });
    this.children.user_setting_phone_change_label = new Label({});
    this.children.user_setting_phone_change_input = new Input({
      events: {
        blur: (e) => this.valid(e),
        focus: (e) => this.focus(e),
      },
    });
    this.children.button_save = new Button({
      label: 'Сохранить',
      events: {
        click: (e) => getFormValue(e),
		},
    });
    this.children.link_back = new Link({
      href: '/userSettings',
      link_title: 'В профиль',
      clas: 'position_centr',
      events: {
        click : (e: Event) => route(e)
      }
    })

    this.setInputsAttributes(this.children.user_setting_email_change_input.getContent(), 'email_user_settings_change', 'email', 'email', '',  store._state.user ? store._state.user.email : '' );
    this.children.user_setting_email_change_input.getContent().classList.add('user_settings');
    this.setLabelsAttributes(this.children.user_setting_email_change_label, 'Почта', 'email_user_settings_change');

    this.setInputsAttributes(this.children.user_setting_login_change_input.getContent(), 'login_user_settings', 'login', 'text', '', store._state.user ? store._state.user.login : '');
    this.children.user_setting_login_change_input.getContent().classList.add('user_settings');
    this.setLabelsAttributes(this.children.user_setting_login_change_label, 'Логин', 'login_user_settings');

    this.setInputsAttributes(this.children.user_setting_name_change_input.getContent(), 'name_user_settings', 'first_name', 'text', '',  store._state.user ? store._state.user.first_name : '');
    this.children.user_setting_name_change_input.getContent().classList.add('user_settings');
    this.setLabelsAttributes(this.children.user_setting_name_change_label, 'Имя', 'name_user_settings');

    this.setInputsAttributes(this.children.user_setting_surname_change_input.getContent(), 'surname_user_settings', 'second_name', 'text', '', store._state.user ? store._state.user.second_name : '');
    this.children.user_setting_surname_change_input.getContent().classList.add('user_settings');
    this.setLabelsAttributes(this.children.user_setting_surname_change_label, 'Фамилия', 'surname_user_settings');

    this.setInputsAttributes(this.children.user_setting_name_inchat_change_input.getContent(), 'display_name_user_settings', 'display_name', 'text', '', store._state.user && store._state.user.display_name ? store._state.user.display_name : '');
    this.children.user_setting_name_inchat_change_input.getContent().classList.add('user_settings');
    this.setLabelsAttributes(this.children.user_setting_name_inchat_change_label, 'Имя в чате', 'display_name_user_settings');

    this.setInputsAttributes(this.children.user_setting_phone_change_input.getContent(), 'phone_user_settings', 'phone', 'tel', '', store._state.user ? store._state.user.phone : '');
    this.children.user_setting_phone_change_input.getContent().classList.add('user_settings');
    this.setLabelsAttributes(this.children.user_setting_phone_change_label, 'Телефон', 'phone_user_settings');
     this.children.button_save.getContent().classList.add('button_primary');
  }
 
  render() {
    this.element.setAttribute('id', 'change_data_form');
    this.element.setAttribute('action', '#');
    this.element.setAttribute('method', 'post');
    return this.compile(template, this.props);
  }
}
