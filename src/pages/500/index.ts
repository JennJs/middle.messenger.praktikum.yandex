import Block, {T} from '../../modules/block/Block';
import template from './tpl.hbs';
import { Link } from '../../components/link';

export class Page500 extends Block<T> {
  constructor(props: T) {
    super('div', props);
  }

  init() {
    this.children.link = new Link({
      href: '/chats',
      clas: 'position_centr',
      link_title: 'Назад к чатам',
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
