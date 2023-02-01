import Block from '../../modules/block/Block';
import template from './tpl.hbs';
import './style.css';

export class Textarea extends Block {
  
  constructor(props) {
    super( 'textarea', props );
  }
  render() {
    return this.compile(template, this.props);
  }
}
