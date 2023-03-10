import Block, {T} from '../../modules/block/Block';
import template from './tpl.hbs';
import './style.css';
import { Input } from '../input';
import sendAvatar from '../../utils/sendAvatar';
import { StoreEvents, store } from '../../utils/Store'

export class Avatar extends Block<T> {
  constructor(props: T) {
    super('form', props);
    
    store.on(StoreEvents.Updated, () => {
      this.setProps(store.getStateAvatar());
    });
  }

  init() {
    this.children.inputFile = new Input({
      events: {
      change: (e) => sendAvatar(e)
      }
    });
    this.children.inputFile.getContent().setAttribute('type', 'file');
    this.children.inputFile.getContent().setAttribute('id', 'avatar');
  }

  render() {
    this.getContent().classList.add('avatar_conteiner');
    return this.compile(template, this.props);
  }
}
