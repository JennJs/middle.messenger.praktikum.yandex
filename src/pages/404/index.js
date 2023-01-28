import Block from '../../modules/block/Block'
import template from './tpl.hbs';
import { Link } from '../../components/link';

export class Page404 extends Block {
  constructor(props) {
    super('div', props);
	console.log(this.children.link);
  }
  init() {
    this.children.link = new Link({ 
		href: '/chats',
		clas: 'position_centr',
		link_title: 'Назад к чатам'
	});
  }
  render() {
    console.log(this.element)
    return this.compile(template, this.props);
  }
}
