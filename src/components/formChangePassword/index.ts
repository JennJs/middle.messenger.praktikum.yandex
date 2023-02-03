import Block from '../../modules/block/Block';
import template from './tpl.hbs';
import './style.css';
import { Avatar } from '../avatar';
import { Label } from '../label';
import { Input } from '../input';
import { Button } from '../button';
import { getFormValue } from '../../utils/getFormValue';

type FormProps = {
  events:{ submit: (e: Event & { target: HTMLInputElement})=> void} 
}

export class FormChangePassword extends Block<FormProps> {
  constructor(props: FormProps) {
    super('form', props);
  }
  init () {
    this.children.avatar = new Avatar({});
    this.children.change_pass_old_pass_label = new Label({});
    this.children.change_pass_old_pass_input = new Input({
      events: {
        blur: (e) => this.valid(e),
        focus: (e) => this.focus(e),
      },
    });
    this.children.change_pass_new_pass_label = new Label({});
    this.children.change_pass_new_pass_input = new Input({
      events: {
        blur: (e) => this.valid(e),
        focus: (e) => this.focus(e),
      },
    });
    this.children.change_pass_new_pass_repeat_label = new Label({});
    this.children.change_pass_new_pass_repeat_input = new Input({
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

    this.setInputsAttributes(this.children.change_pass_old_pass_input.getContent(), 'change_pass_old_pass', 'oldPassword', 'password', '', '123Jfhfrr5');
    this.children.change_pass_old_pass_input.getContent().classList.add('user_settings');
    this.setLabelsAttributes(this.children.change_pass_old_pass_label, 'Старый пароль', 'change_pass_old_pass');

    this.setInputsAttributes(this.children.change_pass_new_pass_input.getContent(), 'change_pass_new_pass', 'newPassword', 'password', '', '');
    this.children.change_pass_new_pass_input.getContent().classList.add('user_settings');
    this.setLabelsAttributes(this.children.change_pass_new_pass_label, 'Новый пароль', 'change_pass_new_pass');

    this.setInputsAttributes(this.children.change_pass_new_pass_repeat_input.getContent(), 'change_pass_new_pass_repeat', 'newPasswordRepeat', 'password', '', '');
    this.children.change_pass_new_pass_repeat_input.getContent().classList.add('user_settings');
    this.setLabelsAttributes(this.children.change_pass_new_pass_repeat_label, 'Повторите новый пароль', 'change_pass_new_pass_repeat'); 
    this.children.button_save.getContent().classList.add('button_primary');
  }
 
  render() {
    this.element.setAttribute('id', 'change_pass_form');
    this.element.setAttribute('action', '#');
    this.element.setAttribute('method', 'post');
    return this.compile(template, this.props);
  }
}
