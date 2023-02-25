import Block , {T} from '../../modules/block/Block';
import template from './tpl.hbs';
import './style.css';
import { Button } from '../button';
import { Input } from '../input';
import { StoreEvents, store } from '../../utils/Store';
import ChatsController from '../../controllers/ChatsController';
import  {ChatWebSocket}  from '../../modules/Socket/ChatWebSocket';
import getMessage from '../../utils/getMessage';

export class MessageFooter extends Block<T> {
  constructor(props: T) {
    super('div', props);

    store.on(StoreEvents.Updated, () => {
      this.setProps(store.getState());
      setTimeout( ( )=> this.scrollToBottom('incoming_message'));
    });

  }

  init(): void {
    this.children.input_message = new Input({});
    this.children.button_send = new Button({
      events: {
        click: (e: Event & { target: HTMLElement}) => this.sendMessage(e)
      },
    });
    this.setInputsAttributes(this.children.input_message.getContent(), 'message_textarea', 'message', 'text', '');
  }
  scrollToBottom = (id: string) => {
    const element = document.getElementById(id) as HTMLDivElement;
    if(element != null) {
      let xH = element.scrollHeight; 
      element.scrollTo({
        top: xH,
      });
    }
  }
  async sendMessage(e: Event & { target: HTMLElement}) {
    let message =  getMessage(e) as  string;
    if (message) {
      let userId = store._state.user.id;
      let chatId = store._state.currentChat[0].id;
      let token = await ChatsController.getToken(chatId) as string;
      const web = new ChatWebSocket()
      await web.connect(userId, chatId, token);
      web.sendMessage(message);
    } 
  }

  render() {
    this.children.button_send.getContent().classList.add('button_send_arrow');
    this.getContent().classList.add('message_window_footer');
    return this.compile(template, this.props);
  }
}
