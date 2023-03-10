import ChatsController from '../../controllers/ChatsController';
import { store } from '../../utils/Store'

export  async function addLastMessage (message: Record<string, any>) {
   store._state.currentChat[0].last_message = message.content;
   store._state.currentChat.messages.push(message.content);
   await ChatsController.getChats();
}

export  async function addMessagesToChat (message: Record<string, any>) {
    store._state.currentChat.messages = [];
    store._state.currentChat.outgoingMessages = [];
    message.forEach( (mes: Record<string, any>) => {
      if(mes.user_id === store._state.user.id) {

         store._state.currentChat.messages.push(mes.content); 
      } else {
         store._state.currentChat.outgoingMessages.push(mes.content); 
      }
      
   })
   await ChatsController.getChats();
}

export  async function addIncomingMessageToChat (message: Record<string, any>) {
   store._state.currentChat.outgoingMessages = [];
   store._state.currentChat.outgoingMessages.push(message.content); 

  await ChatsController.getChats();
}
