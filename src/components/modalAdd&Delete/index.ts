import Block, {T} from '../../modules/block/Block';
import template from './tpl.hbs';
import './style.css';
import { Button } from '../button';
import { StoreEvents, store } from '../../utils/Store'
import { Input } from '../input';

export class ModalAddAndDeleteChat extends Block<T> {
  constructor(props: T) {
    super('form', props);
    
    store.on(StoreEvents.Updated, () => {
      this.setProps(store.getState());
      });
  }

  init() {
    this.children.button = new Button({
      label: this.props.label,
      events: {
        click: this.props.click
      }
  
   });
    this.children.input_add_chat = new Input({
      id: this.props.id,
      placeholder: this.props.placeholder,
      type: this.props.type
    })
  }

  render() {
    return this.compile(template, this.props);
  }
}
