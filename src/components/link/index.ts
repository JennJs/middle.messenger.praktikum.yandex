import Block from '../../modules/block/Block';
import template from './tpl.hbs';
import './style.css';

type LinkProps = {
  href: string,
  link_title: string,
  clas?: string,
  style?: string,
  events?: {
    click: (e: Event & { target: HTMLElement }) => void
  }
}

export class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super('div', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
