import Block , {T} from '../../modules/block/Block';
import template from './tpl.hbs';
import './style.css';
import { Button } from '../button';
import { Input } from '../input';
import store, { StoreEvents } from '../../utils/Store';

export class MessageFooter extends Block<T> {
  constructor(props: T) {
    super('div', props);

    store.on(StoreEvents.Updated, () => {
      this.setProps(store.getState());
      });
    console.log('store ChatHeader:', store)
  }

  init(): void {
    this.children.input_message = new Input({});
    this.children.button_send = new Button({
      events: {
        click: (e: Event) => this.getMessage(e),
      },
    });
    this.setInputsAttributes(this.children.input_message.getContent(), 'message_textarea', 'message', 'text', '');
  }

  getMessage(e: Event) {
    e.preventDefault();
    let result = true;
    const data: Record<string, any> = {};
    const inputMessage = document.getElementById('message_textarea') as HTMLInputElement;

    if (inputMessage.value.trim().length === 0) {
      result = false;
    } else {
      data[inputMessage.name] = inputMessage.value;
      console.log(data);
      inputMessage.value = '';
    }
    return result;
  }

  render() {
    this.children.button_send.getContent().classList.add('button_send_arrow');
    this.getContent().classList.add('message_window_footer');
    return this.compile(template, this.props);
  }
}
