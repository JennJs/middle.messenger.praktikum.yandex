import ChatsController from '../../controllers/ChatsController';
import store from '../../utils/Store'

export  async function addLastMessage (message: Record<string, any>) {
    console.log(message);
    store._state.currentChat[0].last_message = message.content;
   await ChatsController.getChats();

}
