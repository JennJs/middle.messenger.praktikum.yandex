import Block, {T} from '../../modules/block/Block';
import template from './tpl.hbs';
import './style.css';
import { StoreEvents, store } from '../../utils/Store'
import { Button } from '../button';
import { ModalAddAndDeleteChat } from '../modalAdd&Delete';
import showModal from '../../utils/showModal';
import  UsersController  from '../../controllers/UsersController';
import  ChatsController  from '../../controllers/ChatsController';


export class DeleteFromChat extends Block<T> {
  protected children: T
 
  constructor(props: T) {
    super('div', props);

    store.on(StoreEvents.Updated, () => {
      this.setProps(store.getState());
    });
  }

  init() {
    this.children.button = new Button({
      label: 'удалить пользователя из чата',
      events: {
      click: (e: any) => showModal('modal_delete_user', e)
      }
    });
    this.children.modal = new ModalAddAndDeleteChat({
      label: 'Удалить из чата',
      click: (e: Event & { target: HTMLElement}) => this.deleteUserFromChat(e),
      id: 'input_delete_user',
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
    this.children.modal.getContent().classList.add('modal_delete_user')   
    this.setInputsAttributes(this.children.modal.children.input_add_chat.getContent(), this.children.modal.props.id, '', this.children.modal.props.type , this.children.modal.props.placeholder , '');
    this.children.button.getContent().classList.add('button_red');
    this.children.button.getContent().setAttribute('id', 'button_add_user');
    this.children.modal.children.button.getContent().classList.add('button_red');
  }
  hideModal() {
    (document.getElementsByClassName('modal_delete_user')[0]as HTMLDivElement).style.display = 'none';
    (document.getElementsByClassName('login_delete')[0]as HTMLDivElement).style.display = 'block';
  }
  async deleteUserFromChat(e: Event & { target: HTMLElement}) {
    e.preventDefault();
    let inputValue = (document.getElementById('input_delete_user')as HTMLInputElement).value;
    if (inputValue.trim()) {
      await UsersController.searchUserByLogin(inputValue.trim());
      (document.getElementsByClassName('login_delete')[0]as HTMLDivElement).style.display = 'block';
      document.querySelectorAll('.login_del').forEach( (el: Record<string,any> , ind: number) => {
        el.style.display = 'flex';
        el.setAttribute('id', ind);
        el.addEventListener('click',  this.deleteUser);
      })
    }
    inputValue = '';
  }

  deleteUser(e: Event & { target: HTMLElement}) {
    let userIndex = e.target.getAttribute('id') as string;
    let userId: number[] = store._state.search[userIndex].id;
    let currentChatId: number = store._state.currentChat[0].id;

    ChatsController.deleteUsersFromChat(userId, currentChatId)
    store.removeState('search');
    (document.getElementsByClassName('modal_delete_user')[0]as HTMLDivElement).style.display = 'none';
  }

  render() {
    this.getContent().classList.add('delete_from_chat');
    return this.compile(template, this.props);
  }
}
