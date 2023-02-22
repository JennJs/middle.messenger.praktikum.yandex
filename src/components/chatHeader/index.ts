import Block, {T} from '../../modules/block/Block';
import template from './tpl.hbs';
import './style.css';
import { Button } from '../button';
import { Input } from '../input';
import  UsersController  from '../../controllers/UsersController';
import { ModalSearch } from '../modalSearch';
import store, { StoreEvents } from '../../utils/Store'
import { ModalAddAndDeleteChat } from '../modalAdd&Delete';
import  ChatsController from '../../controllers/ChatsController';
import showModal from '../../utils/showModal';


export class ChatHeader extends Block<T> {
  protected children: any;

  constructor(props: T) {
    super('div', props);

    store.on(StoreEvents.Updated, () => {
      this.setProps(store.getState());
    })
  }

  init() {
    this.children.button_search = new Button({
      events: {
        click: ( e: Event & { target: HTMLElement}) => {
          this.getSearchMessage(e),
          showModal('modal', e)
        }
      },
    });
    this.children.input_search = new Input({});
    this.children.add_chat = new Button({
      label: 'Добавить чат',
      events: {
        click: (e) => showModal('modal_add_chat', e)
      },
    });
    this.children.delete_chat = new Button({
      label: 'Удалить чат',
      events: {
        click: (e) => showModal('modal_delete_chat', e),
      },
    })
    this.children.modal_search = new ModalSearch({
      login:  this.searchedUsers
    });
    this.children.modal_add_chat = new ModalAddAndDeleteChat({
      label: 'Добавить',
      click: (e: Event & { target: HTMLElement}) =>  this.getChatTitle(e),
      id: 'input_add_chat',
      type: 'text',
      placeholder: 'Введите название чата', 
    });
    this.children.modal_delete_chat = new ModalAddAndDeleteChat({
      label: 'Удалить',
      click: (e: Event & { target: HTMLElement}) =>  this.getChatTitle(e),
      id: 'input_delete_chat',
      type: 'text',
      placeholder: 'Введите название чата', 
    });

    this.setInputsAttributes(this.children.modal_add_chat.children.input_add_chat.getContent(), this.children.modal_add_chat.props.id, '', this.children.modal_add_chat.props.type , this.children.modal_add_chat.props.placeholder , '');
    this.setInputsAttributes(this.children.modal_delete_chat.children.input_add_chat.getContent(), this.children.modal_delete_chat.props.id, '', this.children.modal_delete_chat.props.type ,this.children.modal_delete_chat.props.placeholder , '');
    this.setInputsAttributes(this.children.input_search.getContent(), 'search_input', 'search', 'text', 'Поиск');
    this.children.button_search.getContent().classList.add('search_button');
    this.children.add_chat.getContent().classList.add('button_secondary');
    this.children.delete_chat.getContent().classList.add('button_red');
    this.children.modal_add_chat.getContent().classList.add('modal_add_chat');
    this.children.modal_delete_chat.getContent().classList.add('modal_delete_chat');
    this.children.delete_chat.getContent().setAttribute('id', 'button_delete_chat');
    this.children.add_chat.getContent().setAttribute('id', 'button_add_chat');
    this.children.modal_add_chat.children.button.getContent().classList.add('button_secondary');
    this.children.modal_delete_chat.children.button.getContent().classList.add('button_red');
    this.children.modal_add_chat.children.button.getContent().setAttribute('id', 'add_chat');
    this.children.modal_delete_chat.children.button.getContent().setAttribute('id', 'delete_chat');
  }

  async getSearchMessage(e: Event & { target: HTMLElement}) {
    e.preventDefault();
    let result = true;
    const data: Record<string, any> = {};
    const search = document.getElementById('search_input') as HTMLInputElement;

    if (search.value.trim().length === 0) {
      result = false;
    } else {

      data[search.name] = search.value;
      console.log(data);

      search.value = '';
      await UsersController.searchUserByLogin(data.search);
      showModal('modal', e)
    }
    return result;
  }

  searchedUsers() {
    let res: string[] =[];
    if (store._state.search && store._state.search.length > 0 ) {
      store._state.search.forEach( (el: Record<string, any>) => {
        res.push(el.login)
      })
    }
    return res;
  }

  getChatTitle(e: Event & { target: HTMLElement}) {
    e.preventDefault();
    let target = e.target;
    let addInput: string = (document.getElementById('input_add_chat') as HTMLInputElement).value;
    let deleteInput: string = (document.getElementById('input_delete_chat') as HTMLInputElement).value;
    if(addInput.length === 0 && deleteInput.length === 0) {
      return
    } else if (target.getAttribute('id') === 'add_chat') {
      ChatsController.createChat(addInput.trim());
      addInput = '';
      (document.getElementsByClassName('modal_add_chat')[0] as HTMLDivElement).style.display = 'none';
    } else {
      let currentChatId: number;
      store._state.chats.forEach( (chat: Record<string, any>) => {
      if (chat.title === deleteInput.trim()) {
        currentChatId = chat.id;
        ChatsController.deleteChatById(currentChatId);
        deleteInput = '';
        (document.getElementsByClassName('modal_delete_chat')[0]as HTMLDivElement).style.display = 'none';
      }
    })
    }
  } 

  render() {
    this.getContent().classList.add('chats_header');
    return this.compile(template, this.props);
  }
}
