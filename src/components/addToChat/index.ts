import Block, {T} from '../../modules/block/Block';
import template from './tpl.hbs';
import './style.css';
import sendAvatar from '../../utils/sendAvatar';
import store, { StoreEvents } from '../../utils/Store'
import { Button } from '../button';
import { ModalAddAndDeleteChat } from '../modalAdd&Delete';
import showModal from '../../utils/showModal';
import  UsersController  from '../../controllers/UsersController';
import  ChatsController  from '../../controllers/ChatsController';

export class AddToChat extends Block<T> {
  constructor(props: T) {
    super('div', props);

    store.on(StoreEvents.Updated, () => {
      this.setProps(store.getState());
    });
  }

  init() {
    this.children.button = new Button({
      label: 'добавить пользователя в чат',
      events: {
     click: (e) => showModal('modal_add_user', e)
      }
    });
    this.children.modal = new ModalAddAndDeleteChat({
      label: 'Добавить в чат',
      click: (e) => this.addUserToChat(e),
      id: 'input_add_user',
      type: 'text',
      placeholder: 'Введите логин пользователя', 
    });
    this.children.modal.getContent().classList.add('modal_add_user')   
    this.setInputsAttributes(this.children.modal.children.input_add_chat.getContent(), this.children.modal.props.id, '', this.children.modal.props.type , this.children.modal.props.placeholder , '');
    this.children.button.getContent().classList.add('button_secondary');
    this.children.button.getContent().setAttribute('id', 'button_add_user');
    this.children.modal.children.button.getContent().classList.add('button_secondary');
  }

  async addUserToChat(e) {
    e.preventDefault();
    let inputValue = document.getElementById('input_add_user').value;
    if (inputValue.trim()) {
      await UsersController.searchUserByLogin(inputValue.trim());
      document.getElementsByClassName('login-conteiner')[0].style.display = 'block';
      document.querySelectorAll('.login').forEach( (el, ind) => {
        el.style.display = 'flex';
        el.setAttribute('id', ind);
        e.target.getAttribute('id')
        el.addEventListener('click',  this.addUser);
      })
    }
    inputValue = '';
  }

  addUser(e) {
    let userIndex = e.target.getAttribute('id');
    let userId = (store._state.search[userIndex].id);
    let currentChatId = store._state.currentChat[0].id;
    console.log(userId, currentChatId )

    // store.removeState('search')
    ChatsController.addUsersToChat(userId, currentChatId)
    store.removeState('search')
    document.getElementsByClassName('modal_add_user')[0].style.display = 'none';

  }

  render() {
    this.getContent().classList.add('add_to_chat');
    return this.compile(template, this.props);
  }
}
