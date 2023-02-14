import Block, {T} from '../../modules/block/Block';
import template from './tpl.hbs';
import './style.css';

export class Avatar extends Block<T> {
  constructor(props: T) {
    super('div', props);
  }

  render() {
    this.getContent().classList.add('avatar_conteiner');
    return this.compile(template, this.props);
  }
}
