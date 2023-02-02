import Block, {T} from '../../modules/block/Block';
import template from './tpl.hbs';
import './style.css';

export class Chat extends Block<T> {
  constructor(props: T) {
    super('div', props);
  }

  render() {
    this.getContent().classList.add('chat');
    return this.compile(template, this.props);
  }
}
