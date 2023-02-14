import Block, {T} from '../../modules/block/Block';
import template from './tpl.hbs';
import './style.css';
import route from '../../utils/navigation';

export class ComeBack extends Block<T> {
  constructor(props: T) {
    super('nav', props);
  }
  init() {
    this.props = {
      events: {
        click : (e: Event) => route(e)
      }
  }
}

  render() {
    return this.compile(template, this.props);
  }
}
