import Block, {T} from '../../modules/block/Block';
import template from './tpl.hbs';
import './style.css';

export class Label extends Block<T> {
  constructor(props: T) {
    super('label', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
