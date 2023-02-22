import Block from '../../modules/block/Block';
import template from './tpl.hbs';
import './style.css';

type I = {
  events?:{
    focus?: (e: Event & { target: HTMLInputElement})=> void,
    blur?: (e: Event & { target: HTMLInputElement})=> void,
    change?: (e: Event & { target: HTMLInputElement})=> void
  } ,
  id?: string,
  placeholder?: string,
  type?: string
}

export class Input extends Block< I> {
  constructor(props: I) {
    super('input', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
