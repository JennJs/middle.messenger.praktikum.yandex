import ChatsController from '../../controllers/ChatsController';
import { store } from '../../utils/Store'

export  async function addLastMessage (message: Record<string, any>) {
   store._state.currentChat[0].last_message = message.content;
   store._state.currentChat.messages.push(message.content);
   await ChatsController.getChats();
}

export  async function addMessagesToChat (message: Record<string, any>) {
    store._state.currentChat.messages = [];
    message.forEach( (mes: Record<string, any>) => {
      store._state.currentChat.messages.push(mes.content); 
   })
   await ChatsController.getChats();
}
