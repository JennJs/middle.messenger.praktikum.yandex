import Block, {T} from '../../modules/block/Block';
import template from './tpl.hbs';
import './style.css';
import { Button } from '../button';
import store, { StoreEvents } from '../../utils/Store'

export class ModalSearch extends Block<T> {
  constructor(props: T) {
    super('div', props);
    store.on(StoreEvents.Updated, () => {
      this.setProps(store.getState());
    });
  }

  init() {
    this.children.button_out = new Button({
      events: {
        click: () => {
          this.hide(),
          store.removeState('search')
        }
      }
    });
  }

  render() {
    this.getContent().classList.add('modal');
    return this.compile(template, this.props);
  }
}
