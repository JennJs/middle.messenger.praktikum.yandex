import Block, {T} from '../../modules/block/Block';
import template from './tpl.hbs';
import './style.css';
import { MessageFooter } from '../../components/message_footer';
import clip from '../../../static/clip.png';
import { StoreEvents, store } from '../../utils/Store';
import { AddToChat } from '../../components/addToChat';
import { DeleteFromChat } from '../../components/deleteFromChat';

export class MessageWindow extends Block<T> {
  constructor(props: T) {
    super('div', props);
    store.on(StoreEvents.Updated, () => {
      this.setProps(store.getChatTitle());
    });
  }

  init() {
    this.children.add_user = new AddToChat({
      login: this.searchedUsers,
    });
    this.children.delete_user = new DeleteFromChat({
      login: this.searchedUsers,
    });
    this.children.message_footer = new MessageFooter({
      url_clip: clip,
    });
  }

  searchedUsers() {
    let res: string[] =[];

    if (store._state.search && store._state.search.length > 0 ) {
      store._state.search.forEach( (el: Record<string,any>) => {
        res.push(el.login)
      })
    }
    return res;
  }

  render() {
    this.getContent().classList.add('message_window');
    return this.compile(template, this.props);
  }
}
