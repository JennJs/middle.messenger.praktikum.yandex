import Block from '../../modules/block/Block'
import template from './tpl.hbs';
import './style.css';
import {MessageFooter} from '../../components/message_footer';
import right_arrow from '../../../static/right-arrow.png';
import clip from '../../../static/clip.png';


export class MessageWindow extends Block {
  constructor(props) {
    super('div', props);
  }
  init() {
    this.children.message_footer = new MessageFooter({
      url_button: right_arrow,
      url_clip: clip
    })
  }

  render() {
    this.getContent().classList.add('message_window');
    return this.compile(template, this.props);
  }
}
