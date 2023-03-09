import Block, {T} from '../../modules/block/Block';
import template from './tpl.hbs';
import './style.css';
import { Input } from '../input';
import { StoreEvents, store } from '../../utils/Store'
import { sendChatAvatar } from '../../utils/sendChatAvatar';

export class ChatAvatar extends Block<T> {
  constructor(props: T) {
    super('form', props);
    
    store.on(StoreEvents.Updated, () => {
      this.setProps(store.getChatTitle());
    });
  }

  init() {
    this.children.input = new Input({
      events: {
      change: (e) => sendChatAvatar(e)
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
