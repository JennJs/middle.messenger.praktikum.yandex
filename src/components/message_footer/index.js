import Block from '../../modules/block/Block';
import template from './tpl.hbs';
import './style.css';
import { Button } from '../button';
import { Textarea } from '../textarea';
import { Input } from '../input';

export class MessageFooter extends Block {
  constructor(props) {
    super( 'div', props );
  }
  
  init() {
    this.children.input_message = new Input()
    this.children.button_send = new Button({
      events:{
        click: (e) => this.getMessage(e),
      } 
    })
    this.setInputsAttributes(this.children.input_message.getContent(), 'message_textarea', 'message', 'text', '' );
    // this.children.input_message.getContent().setAttribute('id', 'message_textarea');
    // this.children.input_message.getContent().setAttribute('name', 'message');
  }
  getMessage(e) {
    e.preventDefault();
    let result = true;
    const data = {};
    const textarea = document.getElementById('message_textarea');
   
    if(textarea.value.trim().length === 0) {
      result = false;
    }else {
      data[textarea.name] = textarea.value
      console.log(data);
      textarea.value = '';
    }
    return result;
  }

  render() {
    this.children.button_send.getContent().classList.add('button_send_arrow');
    this.getContent().classList.add('message_window_footer');
    return this.compile(template, this.props);
  }
}
