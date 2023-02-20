import Block, {T} from '../../modules/block/Block';
import template from './tpl.hbs';
import './style.css';
import store, { StoreEvents } from '../../utils/Store';

export class Chat extends Block<T> {
  constructor(props: T) {
    super('div', props);

    store.on(StoreEvents.Updated, () => {
      this.setProps(store.getState());
      });
      console.log('store Chat:', store)
  }

  render() {
    // this.getContent().classList.add('chat');
    // console.log
    return this.compile(template, this.props);
  }
}
