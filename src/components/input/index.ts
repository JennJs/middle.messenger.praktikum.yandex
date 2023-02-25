import Block from '../../modules/block/Block';
import template from './tpl.hbs';
import './style.css';
import { StoreEvents, store } from '../../utils/Store';

type I = {
  events?:{
    focus?: (e: Event & { target: HTMLInputElement})=> void,
    blur?: (e: Event & { target: HTMLInputElement})=> void,
    change?: (e: Event & { target: HTMLInputElement})=> void
  } ,
  id?: string,
  placeholder?: string,
  type?: string,
  first_name?: string,
  user_email?: string,
  user_login?: string,
  user_name?:  string,
  user_surname?: string,
  user_name_in_chat?: string,
  user_phone?: string,
}

export class Input extends Block< I> {
  constructor(props: I) {
    super('input', props);

    store.on(StoreEvents.Updated, () => {
      this.setProps(store.getStateUserSettings());
    });
  }

  render() {
    if(this.getContent().classList.contains('user_change_data')) {
      if(this.getContent().getAttribute('id') === 'email_user_settings_change') {
        this.getContent().setAttribute('value',  this.props.user_email ? this.props.user_email || store._state.user.email : '')
      } else if ( this.getContent().getAttribute('id') === 'login_user_settings') {
        this.getContent().setAttribute('value', this.props ? this.props.user_login! : '')
      } else if ( this.getContent().getAttribute('id') === 'name_user_settings') {
        this.getContent().setAttribute('value', this.props ? this.props.user_name! : '')
      } else if ( this.getContent().getAttribute('id') === 'surname_user_settings') {
        this.getContent().setAttribute('value', this.props ? this.props.user_surname! : '')
      } else if ( this.getContent().getAttribute('id') === 'display_name_user_settings') {
        this.getContent().setAttribute('value', this.props ? this.props.user_name_in_chat! : '')
      } else if ( this.getContent().getAttribute('id') === 'phone_user_settings') {
        this.getContent().setAttribute('value', this.props ? this.props.user_phone! : '')
      }
    }
    return this.compile(template, this.props);
  }
}
