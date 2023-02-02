import Block, {T} from '../../modules/block/Block';
import template from './tpl.hbs';
import './style.css';
import { Button } from '../button';
import { Input } from '../input';

export class ChatHeader extends Block<T> {
  constructor(props: T) {
    super('div', props);
  }

  init(): void {
    this.children.button_search = new Button({
      events: {
        click: (e: Event) => this.getSearchMessage(e),
      },
    });
    this.children.input_search = new Input({});

    this.setInputsAttributes(this.children.input_search.getContent(), 'search_input', 'search', 'text', 'Поиск');
  }

  getSearchMessage(e: Event): boolean {
    e.preventDefault();
    let result = true;
    const data = {};
    const search = document.getElementById('search_input') as HTMLInputElement;

    if (search.value.trim().length === 0) {
      result = false;
    } else {
      data[search.name] = search.value;
      console.log(data);
      search.value = '';
    }
    return result;
  }

  render() {
    this.children.button_search.getContent().classList.add('search_button');
    this.getContent().classList.add('chats_header');
    return this.compile(template, this.props);
  }
}
