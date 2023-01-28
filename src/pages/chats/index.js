import Block from '../../modules/block/Block'
import template from './tpl.hbs';
import { ChatHeader } from '../../components/chatHeader';
import './style.css';
import search from '../../../static/search.png';
import { MessageWindow } from '../../pages/messageWindow';


export class Chats extends Block {
  constructor(props) {
    super('div', props);
  }
 
  init() {
    this.children.header_chats = new ChatHeader({ 
		name: 'Jenn', 
      url: search, 
    });
    this.children.message_window = new MessageWindow({});
  }
 
  render() {
    return this.compile(template, this.props);
  }
}
