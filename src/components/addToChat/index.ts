import Block from '../../modules/block/Block';
import template from './tpl.hbs';
import './style.css';
import store, { StoreEvents } from '../../utils/Store'
import { Button } from '../button';
import { ModalAddAndDeleteChat } from '../modalAdd&Delete';
import showModal from '../../utils/showModal';
import  UsersController  from '../../controllers/UsersController';
import  ChatsController  from '../../controllers/ChatsController';

type AddToChatProps = { 
  events?: {click: (e: Event & { target: HTMLElement}) => void},
  label?: string,
  login?: Record<string, any>
};

export class AddToChat extends Block<AddToChatProps> {
  children: any;

  constructor(props: AddToChatProps) {
    super('div', props);

    store.on(StoreEvents.Updated, () => {
      this.setProps(store.getState());
    });
  }

  init() {
    this.children.button = new Button({
      label: 'добавить пользователя в чат',
      events: {
         click: (e: any) => {
            showModal('modal_add_user', e),
            store.removeState('search')
          }
        }
    });
    this.children.modal = new ModalAddAndDeleteChat({
      label: 'Добавить в чат',
      click: (e: Event & {target: HTMLElement }) => this.addUserToChat(e),
      id: 'input_add_user',
      type: 'text',
      placeholder: 'Введите логин пользователя', 
    });
    this.children.button_out = new Button({
      events: {
        click: () => {
          this.hideModal(),
          store.removeState('search')
        }
      }
    });
    this.children.modal.getContent().classList.add('modal_add_user')   
    this.setInputsAttributes(this.children.modal.children.input_add_chat.getContent(), this.children.modal.props.id, '', this.children.modal.props.type , this.children.modal.props.placeholder , '');
    this.children.button.getContent().classList.add('button_secondary');
    this.children.button.getContent().setAttribute('id', 'button_add_user');
    this.children.modal.children.button.getContent().classList.add('button_secondary');
  }

  hideModal() {
    (document.getElementsByClassName('modal_add_user')[0] as any).style.display = 'none' 
  }

  async addUserToChat(e: Event & {target: HTMLElement }) {
    e.preventDefault();
    let inputValue = (document.getElementById('input_add_user') as HTMLInputElement).value ; 
    if (inputValue.trim()) {
      await UsersController.searchUserByLogin(inputValue.trim());
      (document.getElementsByClassName('login-conteiner')[0] as HTMLDivElement).style.display = 'block';
      (document.querySelectorAll('.login') as NodeListOf<Element>).forEach( (el: HTMLElement, ind: number) => {
        el.style.display = 'flex';
        el.setAttribute('id', (ind as any));
        e.target.getAttribute('id')
        el.addEventListener('click',  this.addUser);
      })
    }
    inputValue = '';
  }

  addUser(e: Event & {target: HTMLElement }) {
    let userIndex = e.target.getAttribute('id') as string;
    let userId: number[] = (store._state.search[userIndex].id);
    let currentChatId: number = store._state.currentChat[0].id;
    ChatsController.addUsersToChat(userId, currentChatId)
    store.removeState('search');
    (document.getElementsByClassName('modal_add_user')[0] as HTMLDivElement ).style.display = 'none';

  }

  render() {
    this.getContent().classList.add('add_to_chat');
    return this.compile(template, this.props);
  }
}
