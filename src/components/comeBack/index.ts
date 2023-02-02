import Block, {T} from '../../modules/block/Block';
import template from './tpl.hbs';
import './style.css';

export class ComeBack extends Block<T> {
  constructor(props: T) {
    super('nav', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
