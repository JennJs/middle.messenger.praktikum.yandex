import Block, {T} from '../../modules/block/Block';
import template from './tpl.hbs';
import './style.css';
import  { StoreEvents, store } from '../../utils/Store';
import { Input } from '../input';

export class Chat extends Block<T> {
  constructor(props: T) {
    super('div', props);

    store.on(StoreEvents.Updated, () => {
      this.setProps(store.getState());
    });
  }

  init() {
    this.children.input = new Input({
      events: {
        change: (e: Event & { target: HTMLInputElement}) => this.changeChatAvatar(e)
      }
    })

    this.children.input.getContent().setAttribute('type', 'file');

  }

  changeChatAvatar(e) {

  }

  render() {
   
    return this.compile(template, this.props);
  }
}
