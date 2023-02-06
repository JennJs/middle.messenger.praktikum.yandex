import Block, {T} from '../../modules/block/Block';
import template from './tpl.hbs';
import { ComeBack } from '../../components/comeBack';
import left_arrow from '../../../static/left-arrow.png';
import './style.css';
import { getFormValue } from '../../utils/getFormValue';
import { FormChangePassword } from '../../components/formChangePassword';

export class UserChangePassword extends Block<T> {
  constructor(props: T) {
    super('div', props);
  }

  init() {
    this.children.comeback_nav = new ComeBack({
      url: left_arrow,
    });
    this.children.formChangePassword = new FormChangePassword ({
      events: {
        submit: (e) => getFormValue(e)
      }
    })

    this.children.comeback_nav.getContent().classList.add('comeback');
  }

  render() {
    this.getContent().classList.add('settings');
    return this.compile(template, this.props);
  }
}