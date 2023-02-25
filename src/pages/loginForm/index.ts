import Block from '../../modules/block/Block';
import template from './tpl.hbs';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { Link } from '../../components/link';
import { Label } from '../../components/label';
import { getFormValue } from '../../utils/getFormValue';
import route from '../../utils/navigation';
import store, { StoreEvents } from '../../utils/Store';

type LoginFormProps = { 
  events?: {
    submit: (e: Event & { target: HTMLInputElement}) => void,
    click?: (e: Event ) => void
  },
};

export class LoginForm extends Block<LoginFormProps> {
  constructor(props: LoginFormProps) {
    super('form', props);

    store.on(StoreEvents.Updated, () => {
      this.setProps(store.getState());
    });
  }

  init(): void {
    this.children.input_login_label = new Label({});
    this.children.input_login = new Input({
      events: {
        blur: (e: Event & { target: HTMLInputElement}) => this.valid(e),
        focus: (e: Event & { target: HTMLInputElement}) => this.focus(e),
      },
    });
    this.children.input_password_label = new Label({});
    this.children.input_password = new Input({
      events: {
        blur: (e: Event & { target: HTMLInputElement}) => this.valid(e),
        focus: (e: Event & { target: HTMLInputElement}) => this.focus(e),
      },
    });
    this.children.button_log_in = new Button({
      label: 'Войти',
      events: {
        click: (e: Event & { target: HTMLInputElement}) => getFormValue(e),
      },
    });
    this.children.link_sign_in = new Link({
      href: '/registration',
      clas: 'position_centr',
      link_title: 'Нет аккаунта?',
      events: {
        click : (e) => route(e)
      }
    });
    this.setLabelsAttributes(this.children.input_login_label, 'Логин', 'login_log_in');
    this.setInputsAttributes(this.children.input_login.getContent(), 'login_log_in', 'login', 'text', 'Логин');
    this.setLabelsAttributes(this.children.input_password_label, 'Пароль', 'password_log_in');
    this.setInputsAttributes(this.children.input_password.getContent(), 'password_log_in', 'password', 'password', 'Пароль');

    this.children.button_log_in.getContent().classList.add('button_primary');
    this.children.button_log_in.getContent().setAttribute('type', 'submit');
  }

  render() {
    // console.log('LoginForm store from render >>', store)
    return this.compile(template, this.props);
  }
}
