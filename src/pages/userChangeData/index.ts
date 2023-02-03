import Block, {T} from '../../modules/block/Block';
import template from './tpl.hbs';
import { ComeBack } from '../../components/comeBack';
import left_arrow from '../../../static/left-arrow.png';
import './style.css';
import { getFormValue } from '../../utils/getFormValue';
import { FormChangeData } from '../../components/formChangeData';

export class UserChangeData extends Block<T> {
  constructor(props: T) {
    super('div', props);
  }

  init() {
    this.children.comeback_nav = new ComeBack({
      url: left_arrow,
    });
    this.children.form_change_data = new FormChangeData({
      events: {
        submit: (e) => getFormValue(e)
      }
    });
    this.children.comeback_nav.getContent().classList.add('comeback');
  }

  render() {
    return this.compile(template, this.props);
  }
}
