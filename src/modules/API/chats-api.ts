import BaseAPI from './Base-api';

export class ChatsAPI extends BaseAPI {
    constructor() {
      super('/chats');
    }
  
    createChat(title: string) {
      return this.http.post('', {title: title});
    }
  
  
    getChats() {
      return this.http.get('')
    }
  
    addUsers(Usersid: number[], chatId: number) {
      return this.http.put('/users', {
          users: [Usersid],
          chatId: chatId,
        })
    }
  
    deleteUsers(Usersid: number[], chatId: number) {
      return this.http.delete('/users', {
        users: [Usersid],
        chatId: chatId,
      })
    }
  
    deleteChat(chatId: number) {
      return this.http.delete('', {
          chatId: chatId,
      })
    }
  
    getToken(chat_id: number) {
      return this.http.post(`/token/${chat_id}`)
    }

    changeAvatar (data: FormData) {
      return this.http.put('/avatar', data)
    }

  }
  
  export default new ChatsAPI();
