import Block from '../../modules/block/Block';
import template from './tpl.hbs';
import './style.css';

export class Chat extends Block {
  constructor(props) {
    super( 'div', props );
    
  }
  render() {
    this.getContent().classList.add('chat')
    return this.compile(template, this.props);
  }
}

