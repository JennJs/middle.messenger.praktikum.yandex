import Block, {T} from '../../modules/block/Block';
import template from './tpl.hbs';
import './style.css';

type ButtonProps = { 
  events: {click: (e: Event & { target: HTMLInputElement}) => void},
  label?: string
};

export class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super('button', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
