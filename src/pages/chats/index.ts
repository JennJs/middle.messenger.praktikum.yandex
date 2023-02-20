import Block, {T} from '../../modules/block/Block';
import template from './tpl.hbs';
import { ChatHeader } from '../../components/chatHeader';
import './style.css';
import search from '../../../static/search.png';
import { MessageWindow } from '../messageWindow';
import { Chat } from '../../components/chat';
import avatar1 from '../../../static/avatar.png';
import store,  { StoreEvents } from '../../utils/Store';
import  ChatsController  from '../../controllers/ChatsController';

export class Chats extends Block<T> {
  constructor(props: T) {
    super('div', props);
    
    store.on(StoreEvents.Updated, () => {
      this.setProps(store.getState());
      });
    console.log('store Chat:', store)
  }

  init() {
    this.children.header_chats = new ChatHeader({
      name: store._state.user.first_name,
      url: search,
    });
    this.children.chat = new Chat({
    chat: () => this.chats(),
        events: {
        click: (e: Event) => this.setCurrentChat(e)
      }
 
      
    });
    this.children.message_window = new MessageWindow({
      incoming_message: store._state.incoming_message,
      outgoing_message: store._state.outgoing_message,
      // incoming_message: 'jgtrhit',
      // outgoing_message: 'store._state.outgoing_message',
    });
  }

  chats () {
    let chat: string[] = [];
    let avatar =  avatar1
    if (store._state.chats.length > 0 ) {
      store._state.chats.forEach( el => {
        el.avatarUrl = avatar;
        chat.push(el)
      })
    }
    return chat;
  }

  setCurrentChat(e: Event ) {
    let currentChat: Record<string, any> = [];
    let currentChatId: number = e.target.parentNode.getAttribute('id');
    store._state.chats.forEach( el => {
     if (el.id === Number(currentChatId)) {
         currentChat.push(el)
      }
    })
   store.set('currentChat', currentChat);
  }
  // names() {
  //   let names: string[] = [];
  //   if (store._state.chats.length > 0 ) {
  //     store._state.chats.forEach( el => {
  //       names.push(el.title)
  //     })
  //   }
  //   console.log(names);
  //   return names;
  // }
  render() {
    return this.compile(template, this.props);
  }
}
