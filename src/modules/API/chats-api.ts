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
  
    addUsers(id: number[], chatId: number) {
      return this.http.put('/users', {
        data: {
          users: id,
          chatId: chatId,
        }
      })
    }
  
    DeleteUsers(id: number[], chatId: number) {
      return this.http.delete('/users', {
        data: {
          users: id,
          chatId: chatId,
        },
      })
    }
  
    deleteChat(chatId: number) {
      return this.http.delete('', {
          chatId: chatId,
      })
    }
  
    get_token(chat_id: number) {
      return this._set(`token/${chat_id}`).then(
        (res: HTTPResponse<{ token: string }>) => res.data?.token
      )
    }
  }
  
  export default new ChatsAPI();
