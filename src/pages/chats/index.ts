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
import { ChatWebSocket } from '../../modules/Socket/ChatWebSocket';
import { Link } from '../../components/link';

export class Chats extends Block<T> {
  constructor(props: T) {
    super('div', props);
    
    store.on(StoreEvents.Updated, () => {
      // this.setProps(store.getState());
      this.setProps(store.getStateChats());
    });
    // console.log('Chats props from constructor >>', this.props);
    // console.log('Chats store from constructor >>', store)
  }

  init() {
   
    this.children.header_chats = new ChatHeader({
      // name: store._state.user ? store._state.user.first_name : '',
      // name: this.props.name,
      url: search,
    });
    this.children.chat = new Chat({
    chat: () => this.chats(),
        events: {
        click: (e: Event & {target: any , parentNode: HTMLElement}) => this.setCurrentChat(e)
      } 
    });
    this.children.message_window = new MessageWindow({
      // chat_title: this.props.chat_title || store._state.currentChat ?  this.props.chat_title || store._state.currentChat[0].title : '',
      chat_title:   this.props.chat_title  ,
      incoming_message: '',
      outgoing_message:  store._state.currentChat && store._state.currentChat[0].last_message ? store._state.currentChat[0].last_message.content || store._state.currentChat[0].last_message: '',
    });
  }

  chats () {
    let chat: Record<string, any> = [];
    let avatar =  avatar1
    if (store._state.chats && store._state.chats.length > 0 ) {
      store._state.chats.forEach( (el: Record<string, any>) => {
        el.avatarUrl = avatar;
        chat.push(el)
      })
    }
    return chat;
  }

  async setCurrentChat(e: Event & {target: any , parentNode: HTMLElement}) {
    const web = new ChatWebSocket()
    web.disconnect()
    await ChatsController.getChats()
    let currentChat: Record<string, any> = [];
    let currentChatId: number = e.target.parentNode.getAttribute('id');
    store._state.chats.forEach( (el: Record<string, any>)  => {
     if (el.id === Number(currentChatId)) {
        currentChat.push(el)
      }
    })
   store.set('currentChat', currentChat);
  }
  render() {
    // console.log('Chats props from render >>', this.props);
    // console.log('Chats store from render >>', store)
    return this.compile(template, this.props);
  }
}
