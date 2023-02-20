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

export class DeleteFromChat extends Block<T> {
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
     click: (e) => showModal('modal_delete_user', e)
      }
    });
    this.children.modal = new ModalAddAndDeleteChat({
      label: 'Удалить из чата',
      click: (e) => this.deleteUserFromChat(e),
      id: 'input_delete_user',
      type: 'text',
      placeholder: 'Введите логин пользователя', 
    });
    this.children.modal.getContent().classList.add('modal_delete_user')   
    this.setInputsAttributes(this.children.modal.children.input_add_chat.getContent(), this.children.modal.props.id, '', this.children.modal.props.type , this.children.modal.props.placeholder , '');
    this.children.button.getContent().classList.add('button_red');
    this.children.button.getContent().setAttribute('id', 'button_add_user');
    this.children.modal.children.button.getContent().classList.add('button_red');
  }

  async deleteUserFromChat(e) {
    e.preventDefault();
    let inputValue = document.getElementById('input_delete_user').value;
    if (inputValue.trim()) {
      console.log(inputValue.trim())
      await UsersController.searchUserByLogin(inputValue.trim());
      document.querySelectorAll('.login_delete').forEach( (el, ind) => {
        el.style.display = 'flex';
        el.setAttribute('id', ind);
        el.addEventListener('click',  this.deleteUser);
      })
    }
    inputValue = '';
  }

  deleteUser(e) {
    
    // store.removeState('search')
    // document.getElementsByClassName('modal_delete_user')[0].style.display = 'none';
    let userIndex = e.target.getAttribute('id');
    let userId = store._state.search[userIndex].id;
    let currentChatId = store._state.currentChat[0].id;
    console.log(userId, currentChatId )

    // store.removeState('search')
    ChatsController.deleteUsersFromChat(userId, currentChatId)
    store.removeState('search')
    document.getElementsByClassName('modal_delete_user')[0].style.display = 'none';
  }
  // searchedUsers() {
  //   let res: string[] =[];
  //   if (store._state.search.length > 0 ) {
  //     store._state.search.forEach( el => {
  //       res.push(el.login)
  //     })
  //   }
  //   return res;
  // }

  render() {
    // console.log('add to chat props:', this.props)
    this.getContent().classList.add('add_to_chat');
    return this.compile(template, this.props);
  }
}
