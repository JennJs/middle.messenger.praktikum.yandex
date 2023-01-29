import Block from '../../modules/block/Block';
import template from './tpl.hbs';
import './style.css';
import { Button } from '../button';

export class MessageFooter extends Block {
  constructor(props) {
    super( 'div', props );
  }
  
  init() {
    this.children.button_send = new Button({
      events:{
        click: (e) => this.getMessage(e)
      } 
    })
  }
  getMessage(e) {
    e.preventDefault();
    const data = {};
    const textarea = document.getElementById('message_textarea');
    data[textarea.name] = textarea.value
    console.log(data);
    textarea.value = '';
    return false;
  }
  render() {
    this.children.button_send.getContent().classList.add('button_send_arrow');
    this.getContent().classList.add('message_window_footer');
    return this.compile(template, this.props);
  }
}
