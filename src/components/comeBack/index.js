import Block from '../../modules/block/Block';
import template from './tpl.hbs';
import './style.css';

export class ComeBack extends Block {
  constructor(props) {
    super('nav', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
