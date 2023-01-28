import Block from '../../modules/block/Block'
import template from './tpl.hbs';
import './style.css';

export class MessageWindow extends Block {
  constructor(props) {
    super('div', props);
	;
  }

  render() {
    return this.compile(template, this.props);
  }
}
