import Block, {T} from '../../modules/block/Block';
import template from './tpl.hbs';
import './style.css';
import  { StoreEvents, store } from '../../utils/Store';


export class Chat extends Block<T> {
  constructor(props: T) {
    super('div', props);

    store.on(StoreEvents.Updated, () => {
      this.setProps(store.getState());
    });
  }

  
  render() {
    return this.compile(template, this.props);
  }
}
