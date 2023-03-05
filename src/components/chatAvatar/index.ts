import Block, {T} from '../../modules/block/Block';
import template from './tpl.hbs';
import './style.css';
import { Input } from '../input';
import sendAvatar from '../../utils/sendAvatar';
import { StoreEvents, store } from '../../utils/Store'

export class ChatAvatar extends Block<T> {
  constructor(props: T) {
    super('form', props);
    
    store.on(StoreEvents.Updated, () => {
      this.setProps(store.getStateAvatar());
    });
  }

  init() {
    this.children.input = new Input({
      events: {
      change: (e) => sendAvatar(e)
      }
    });
    this.children.input.getContent().setAttribute('type', 'file');
    this.children.input.getContent().setAttribute('id', 'chat_avatar');
  }

  render() {
    this.getContent().classList.add('form_chat_avatar');
    return this.compile(template, this.props);
  }
}
