import Block, {T} from '../../modules/block/Block';
import template from './tpl.hbs';
import './style.css';

export class Input extends Block<T> {
  constructor(props: T) {
    super('input', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
