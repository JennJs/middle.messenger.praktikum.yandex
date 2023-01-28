import Block from '../../modules/block/Block';
import template from './tpl.hbs';
import './style.css';

export class UserSettings extends Block {
  constructor(props) {
    super( 'div', props );
  }
  render() {
    this.getContent().classList.add('user_settings_conteiner');
    return this.compile(template, this.props);
  }
}
