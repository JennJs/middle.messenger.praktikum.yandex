import API from '../modules/API/chats-api';
import { store } from '../utils/Store';


export class ChatsController {
  private readonly api;

  constructor() {
    this.api = API;
  }

  async getChats() {
    const response:any =  await this.api.getChats();
    const chatsInfo = JSON.parse(response);
    store.set('chats', chatsInfo)
  }

  async createChat( title: string ) {
    try {
      await this.api.createChat(title);
      this.getChats()
    } catch (e) {
      console.error('createChat:', e);
    }
  }

  async deleteChatById(chat_id: number) {
    try {
      await this.api.deleteChat(chat_id);
      this.getChats()
    } catch (e) {
      console.error('deleteChatById:', e);
    }
  }

  async addUsersToChat(users_id: number[], chat_id: number) {
    try {
      await this.api.addUsers(users_id, chat_id );
      this.getChats()
    } catch (e) {
      console.error('addUsersToChat:', e);
    }
  }

  async deleteUsersFromChat(users_id: number[], chat_id: number) {
    try {
      await this.api.deleteUsers(users_id, chat_id );
      this.getChats()
    } catch (e) {
      console.error('deleteUsersFromChat:', e);
    }
  }

  async getToken(chat_id: number) : Promise<string | undefined>  {
    try {
      const response =  await this.api.getToken(chat_id) as any;
      const data: Record<string, string> = JSON.parse(response);
      return data.token
    } catch (e) {
      console.error('addUsersToChat:', e);
    }
  }
  async changeChatAvatar(data: FormData ) {
    try {
      const response = await this.api.changeAvatar(data) as  any;
      const newChatData = JSON.parse(response);
      store._state.currentChat[0].avatar = `${newChatData.avatar}`
      this.getChats()
    } catch (e) {
      console.error('changeAvatar error:', e);
    }
  }
} 
export default new ChatsController();
