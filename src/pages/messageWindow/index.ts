import Block, {T} from '../../modules/block/Block';
import template from './tpl.hbs';
import './style.css';
import { MessageFooter } from '../../components/message_footer';
import clip from '../../../static/clip.png';
import store , { StoreEvents } from '../../utils/Store';

export class MessageWindow extends Block<T> {
  constructor(props: T) {
    super('div', props);
    store.on(StoreEvents.Updated, () => {
      this.setProps(store.getState());
      });
    console.log('MessageWindow', store)
  }

  init() {
    this.children.message_footer = new MessageFooter({
      url_clip: clip,
    });
  }

  render() {
    this.getContent().classList.add('message_window');
    return this.compile(template, this.props);
  }
}
