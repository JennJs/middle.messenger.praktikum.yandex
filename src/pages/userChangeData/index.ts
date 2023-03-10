import Block, {T} from '../../modules/block/Block';
import template from './tpl.hbs';
import { ComeBack } from '../../components/comeBack';
import './style.css';
import { getFormValue } from '../../utils/getFormValue';
import { FormChangeData } from '../../components/formChangeData';
import { StoreEvents, store } from '../../utils/Store';

export class UserChangeData extends Block<T> {
  constructor(props: T) {
    super('div', props);

    store.on(StoreEvents.Updated, () => {
      this.setProps(store.getStateUserSettings());
    });
  }

  init() {
    this.children.comeback_nav = new ComeBack({});
    this.children.form_change_data = new FormChangeData({
      events: {
        submit: (e) => getFormValue(e)
      }
    });
    this.children.comeback_nav.getContent().classList.add('comeback');
  }

  render() {
    console.log()
    return this.compile(template, this.props);
  }
}
