// import Block from '../../utils/Block';
import Block from '../../modules/block/Block'
import template from './home.hbs';
import { Button } from '../../components/Button';

export class HomePage extends Block {
  constructor(props) {
    super('div', props);
  }

  init() {
    this.children.button = new Button({
      label: 'Click me',
      events: {
        click: () => console.log('clicked'),
      },
      
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
