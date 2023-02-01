import Block from '../../modules/block/Block';
import template from './tpl.hbs';
import './style.css';

export class Button extends Block {
  constructor(props) {
    super('button', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
