import Block from '../../modules/block/Block';
import template from './tpl.hbs';
import { ChatHeader } from '../../components/chatHeader';
import './style.css';
import search from '../../../static/search.png';
import { MessageWindow } from '../messageWindow';
import { Chat } from '../../components/chat';
import avatar from '../../../static/avatar.png';

export class Chats extends Block {
  constructor(props) {
    super('div', props);
  }

  init() {
    this.children.header_chats = new ChatHeader({
      name: 'Jenn',
      url: search,
    });
    this.children.chat = new Chat({
      chat_name: 'Андрей',
      last_message: 'Изображение',
      url: avatar,
      time: '10:49',
      new_messages: '2',
    });
    this.children.chat2 = new Chat({
      chat_name: 'Анна',
      last_message: 'Привет',
      url: avatar,
      time: '17:50',
      new_messages: '1',
    });
    this.children.message_window = new MessageWindow({
      incoming_message: 'Привет. Как дела?',
      outgoing_message: 'Отлично',
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
