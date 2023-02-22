import API from '../modules/API/chats-api';
import store from '../utils/Store';


export class ChatsController {
  private readonly api;

  constructor() {
    this.api = API;
    console.log(this.api);
  }

  async getChats() {
    const response:any =  await this.api.getChats();
    const chatsInfo = JSON.parse(response);
    console.log('getChatsresponse:', chatsInfo );
    store.set('chats', chatsInfo)
  }

  async createChat( title: string ) {
    try {
      const response =  await this.api.createChat(title);
      console.log(response);
      this.getChats()
    } catch (e: any) {
      console.error('createChat:', e);
    }
  }

  async deleteChatById(chat_id: number) {
    try {
      const response =  await this.api.deleteChat(chat_id);
      console.log(response);
      this.getChats()
    } catch (e: any) {
      console.error('deleteChatById:', e);
    }
  }

  async addUsersToChat(users_id: number[], chat_id: number) {
    try {
      const response =  await this.api.addUsers(users_id, chat_id );
      console.log(response);
      this.getChats()
    } catch (e: any) {
      console.error('addUsersToChat:', e);
    }
  }

  async deleteUsersFromChat(users_id: number[], chat_id: number) {
    try {
      const response =  await this.api.deleteUsers(users_id, chat_id );
      console.log(response);
      this.getChats()
    } catch (e: any) {
      console.error('deleteUsersFromChat:', e);
    }
  }

  async getToken(chat_id: number) {
    try {
      const response: any =  await this.api.getToken(chat_id)
      const data = JSON.parse(response);
      return data.token
    } catch (e: any) {
      console.error('addUsersToChat:', e);
    }
  }
} 

export default new ChatsController();
