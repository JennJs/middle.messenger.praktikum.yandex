import Block, {T} from '../../modules/block/Block';
import template from './tpl.hbs';
import { Link } from '../../components/link';
import { ComeBack } from '../../components/comeBack';
import left_arrow from '../../../static/left-arrow.png';
import { Avatar } from '../../components/avatar';
import './style.css';
import route from '../../utils/navigation';
import AuthController from '../../controllers/AuthController';
import sendAvatar from '../../utils/sendAvatar';
import store, { StoreEvents } from "../../utils/Store";
import { UserSettings } from '../../components/userSettings';

export class UserSettingsPage extends Block<T> {
  constructor(props: T) {
    super('div', props);

    store.on(StoreEvents.Updated, () => {
      this.setProps(store.getStateAvatar());
    });
    // console.log('UserSettingsPage props from constructor >>', this.props);
    // console.log('UserSettingsPage store from constructor >>', store)
  }
  init() {
    this.children.comeback_nav = new ComeBack({
      url: left_arrow,
    });
    this.children.avatar = new Avatar({
      events: {
        submit: (e: Event & { target: HTMLInputElement}) => sendAvatar(e)
      }
    });
    this.children.settings = new UserSettings({})
    
    this.children.link_change_data = new Link({
      href: '/userSettings/change-data',
      link_title: 'Изменить данные',
      clas: 'position_left',
      events: {
        click : (e) => route(e)
      }
    });
    this.children.link_change_pass = new Link({
      href: '/userSettings/change-password',
      link_title: 'Изменить пароль',
      clas: 'position_left',
      events: {
        click : (e) => route(e)
      }
    });
    this.children.link_logout = new Link({
      href: '/login',
      link_title: 'Выйти',
      clas: 'position_left',
      style: 'color:red',
      events: {
        click : (e) => { 
          AuthController.logout();
          route(e)
        }
      }
    });
  }

  render() {
    // console.log('UserSettingsPage  this.children.settings.first_name from render >>', this.props.first_name);
    // console.log('UserSettingsPage  this.children.settings >>', this.children.settings.props.first_name);

    // console.log('UserSettingsPage props from render >>', this.props);
    // console.log('UserSettingsPage store from render >>', store)

    this.getContent().classList.add('settings');
    this.children.comeback_nav.getContent().classList.add('comeback');
    return this.compile(template, this.props);
  }
}
