import Block from '../../modules/block/Block';
import template from './tpl.hbs';
import './style.css';

export class Label extends Block {
  constructor(props) {
    super('label', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}