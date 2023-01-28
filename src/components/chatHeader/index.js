import Block from '../../modules/block/Block';
import template from './tpl.hbs';
import './style.css';

export class ChatHeader extends Block {
  constructor(props) {
    super( 'div', props );
    
  }

  // getContent().classList.add('test');

  render() {
    return this.compile(template, this.props);
  }
}

