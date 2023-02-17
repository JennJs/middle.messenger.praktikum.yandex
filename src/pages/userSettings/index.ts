import Block, {T} from '../../modules/block/Block';
import template from './tpl.hbs';
import { Link } from '../../components/link';
import { ComeBack } from '../../components/comeBack';
import left_arrow from '../../../static/left-arrow.png';
import { Avatar } from '../../components/avatar';
import './style.css';
import { Label } from '../../components/label';
import { Input } from '../../components/input';
import route from '../../utils/navigation';
import AuthController from '../../controllers/AuthController';
import UserController from '../../controllers/UsersController';
import sendAvatar from '../../utils/sendAvatar';

import store, { StoreEvents } from "../../utils/Store";

export class UserSettingsPage extends Block<T> {
  constructor(props: T) {
    super('div', props);

    // подписываемся на событие
     store.on(StoreEvents.Updated, () => {
   // вызываем обновление компонента, передав данные из хранилища
      this.setProps(store.getState());
      });
    console.log('store',store)
    // console.log(store._state.user.email)

  }


  init() {
    this.children.comeback_nav = new ComeBack({
      url: left_arrow,
    });
    this.children.avatar = new Avatar({
      storeUrl: store._state.user.avatar,
      events: {
        submit: (e) => sendAvatar(e)
      }
    });
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
      events: {
        click : (e: Event) => route(e)
      }
    });
    this.children.link_change_pass = new Link({
      href: '/userSettings/change-password',
      link_title: 'Изменить пароль',
      clas: 'position_left',
      events: {
        click : (e: Event) => route(e)
      }
    });
    this.children.link_logout = new Link({
      href: '/login',
      link_title: 'Выйти',
      clas: 'position_left',
      style: 'color:red',
      events: {
        click : (e: Event) => { 
          AuthController.logout();
          route(e)
        }
      }
    });
    console.log('store',store)

    

    this.setInputsAttributes(this.children.user_setting_email_input.getContent(), 'email_user_settings', 'email', 'email', '',  store._state.user ? store._state.user.email : '' );
    this.children.user_setting_email_input.getContent().setAttribute('disabled', '');
    this.children.user_setting_email_input.getContent().classList.add('user_settings');
    this.setLabelsAttributes(this.children.user_setting_email_label, 'Почта', 'email_user_settings');

    this.setInputsAttributes(this.children.user_setting_login_input.getContent(), 'login_user_settings', 'login', 'text', '', store._state.user ? store._state.user.login : '');
    this.children.user_setting_login_input.getContent().setAttribute('disabled', '');
    this.children.user_setting_login_input.getContent().classList.add('user_settings');
    this.setLabelsAttributes(this.children.user_setting_login_label, 'Логин', 'login_user_settings');

    this.setInputsAttributes(this.children.user_setting_name_input.getContent(), 'name_user_settings', 'first_name', 'text', '', store._state.user ? store._state.user.first_name : '');
    this.children.user_setting_name_input.getContent().setAttribute('disabled', '');
    this.children.user_setting_name_input.getContent().classList.add('user_settings');
    this.setLabelsAttributes(this.children.user_setting_name_label, 'Имя', 'name_user_settings');

    this.setInputsAttributes(this.children.user_setting_surname_input.getContent(), 'surname_user_settings', 'second_name', 'text', '', store._state.user ? store._state.user.second_name : '');
    this.children.user_setting_surname_input.getContent().setAttribute('disabled', '');
    this.children.user_setting_surname_input.getContent().classList.add('user_settings');
    this.setLabelsAttributes(this.children.user_setting_surname_label, 'Фамилия', 'surname_user_settings');

    this.setInputsAttributes(this.children.user_setting_name_inchat_input.getContent(), 'display_name_user_settings', 'display_name', 'text', '', store._state.user && store._state.user.display_name ? store._state.user.display_name : '' );
    this.children.user_setting_name_inchat_input.getContent().setAttribute('disabled', '');
    this.children.user_setting_name_inchat_input.getContent().classList.add('user_settings');
    this.setLabelsAttributes(this.children.user_setting_name_inchat_label, 'Имя в чате', 'display_name_user_settings');

    this.setInputsAttributes(this.children.user_setting_phone_input.getContent(), 'phone_user_settings', 'phone', 'tel', '', store._state.user ? store._state.user.phone : '' );
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
