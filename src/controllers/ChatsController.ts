import API from '../modules/API/chats-api';
import store from '../utils/Store';
import Router from '../modules/router/Router';
// import MessagesController from './MessagesController';


export class ChatsController {
  private readonly api;

  constructor() {
    this.api = API;
    console.log(this.api);
  }

  async getChats() {
    const response =  await this.api.getChats();
    const chatInfo = JSON.parse(response);
    console.log('getChatsresponse:', chatInfo );
    store.set('chats', chatInfo)
  }

  async createChat( title: string ) {
    try {
      // console.log(data);
      const response =  await this.api.createChat(title);
      // const newUserData = JSON.parse(response);
      console.log(response);
      this.getChats()

      // store.set('user', newUserData);
      // console.log(store)

      // (new Router()).go('/userSettings');
      console.log('changeUserData')
    } catch (e: any) {
      console.error('changeUserData:', e);
    }
  }

  deleteChatById() {
  }

} 

export default new ChatsController();
