import Block from '../../modules/block/Block';
import template from './tpl.hbs';
import './style.css';
import { Button } from '../button';

export class ChatHeader extends Block {
  constructor(props) {
    super( 'div', props );
  }

  init() {
    this.children.button_search = new Button({
      events: {
        click: (e) => this.getFormValue(e)
      }
    })
  }
  render() {
    this.children.button_search.getContent().classList.add('search_button');
    this.getContent().classList.add('chats_header');
    return this.compile(template, this.props);
  }
}

