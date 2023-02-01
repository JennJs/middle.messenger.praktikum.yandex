import Block from '../../modules/block/Block';
import template from './tpl.hbs';
import './style.css';

export class Input extends Block {
  constructor(props) {
    super('input', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
