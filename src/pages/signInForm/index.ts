import Block from '../../modules/block/Block';
import template from './tpl.hbs';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { Link } from '../../components/link';
import { Label } from '../../components/label';
import { getFormValue } from '../../utils/getFormValue';
import route from '../../utils/navigation';
import store, { StoreEvents } from '../../utils/Store';

type SigninFormProps = { 
  events?: {
    submit: (e: Event & { target: HTMLInputElement}) => void,
  },
};

export class SignInForm extends Block<SigninFormProps> {
  constructor(props: SigninFormProps) {
    super('form', props);

    store.on(StoreEvents.Updated, () => {
      this.setProps(store.getState());
    });
  }

  init() {
    this.children.input_email_label = new Label({});
    this.children.input_email = new Input({
      events: {
        blur: (e) => this.valid(e),
        focus: (e) => this.focus(e),
      },
    });
    this.children.input_login_label = new Label({});
    this.children.input_login = new Input({
      events: {
        blur: (e) => this.valid(e),
        focus: (e) => this.focus(e),
      },
    });
    this.children.input_name_label = new Label({});
    this.children.input_name = new Input({
      events: {
        blur: (e) => this.valid(e),
        focus: (e) => this.focus(e),
      },
    });
    this.children.input_surname_label = new Label({});
    this.children.input_surname = new Input({
      events: {
        blur: (e) => this.valid(e),
        focus: (e) => this.focus(e),
      },
    });
    this.children.input_tel_label = new Label({});
    this.children.input_tel = new Input({
      events: {
        blur: (e) => this.valid(e),
        focus: (e) => this.focus(e),
      },
    });
    this.children.input_password_label = new Label({});
    this.children.input_password = new Input({
      events: {
        blur: (e) => this.valid(e),
        focus: (e) => this.focus(e),
      },
    });
    this.children.button_sign_in = new Button({
      label: 'Зарегистрироваться',
      events: {
        click: (e) => getFormValue(e),
      },
    });
    this.children.link_log_in = new Link({
      href: '/login',
      clas: 'position_centr',
      link_title: 'Войти',
      events: {
        click : (e) => route(e)
      }
    });
    this.setLabelsAttributes(this.children.input_email_label, 'Email', 'email_sign_in');
    this.setInputsAttributes(this.children.input_email.getContent(), 'email_sign_in', 'email', 'email', 'Email');

    this.setLabelsAttributes(this.children.input_login_label, 'Логин', 'login_sign_in');
    this.setInputsAttributes(this.children.input_login.getContent(), 'login_sign_in', 'login', 'text', 'Логин');

    this.setLabelsAttributes(this.children.input_name_label, 'Имя', 'first_name_sign_in');
    this.setInputsAttributes(this.children.input_name.getContent(), 'first_name_sign_in', 'first_name', 'text', 'Имя');

    this.setLabelsAttributes(this.children.input_surname_label, 'Фамилия', 'second_name_sign_in');
    this.setInputsAttributes(this.children.input_surname.getContent(), 'second_name_sign_in', 'second_name', 'text', 'Фамилия');

    this.setLabelsAttributes(this.children.input_tel_label, 'Телефон', 'phone_sign_in');
    this.setInputsAttributes(this.children.input_tel.getContent(), 'phone_sign_in', 'phone', 'tel', 'Телефон');

    this.setLabelsAttributes(this.children.input_password_label, 'Пароль', 'password_sign_in');
    this.setInputsAttributes(this.children.input_password.getContent(), 'password_sign_in', 'password', 'password', 'Пароль');

    this.children.button_sign_in.getContent().classList.add('button_primary');
  }

  render() {
    return this.compile(template, this.props);
  }
}
