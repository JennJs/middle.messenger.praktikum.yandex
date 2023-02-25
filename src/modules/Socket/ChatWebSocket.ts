import { store } from '../../utils/Store'
import { addLastMessage, addMessagesToChat } from './actions';

  
export class ChatWebSocket  {

    private socket: WebSocket | null
    private open: boolean = false;
    private intervalSendMessage: any
    private intervalPing: any

    async connect(userId: number, chatId: number, token: string ) {
      this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`); 
      if (this.socket?.readyState === 1) {
        this.disconnect();
      }
        this.socket.addEventListener('open', () => {
        console.log('Соединение установлено');
        this.open = true;
        this.getMessages()

        this.intervalPing = setInterval(() => {
          this.socket?.send(JSON.stringify({ type: 'ping' }))
        }, 10000)
      })

      this.socket.addEventListener('close', event => {
        if (event.wasClean) {
          console.log('Соединение закрыто чисто');
        } else {
          console.log('Обрыв соединения');
        }
        console.log(`Код: ${event.code} | Причина: ${event.reason}`);
      });
      
      this.socket.addEventListener('message', event => {
          const data = JSON.parse(event.data);
          const message: Record<string, any> = Array.isArray(data) ? (data as []).reverse() : data;
          if (Array.isArray(message) ) {
            store.set('messages', message );
            addMessagesToChat(message)
          } else if (message.type === 'message') {
            addLastMessage(message);
          }
      });
      
      this.socket.addEventListener('error', event => {
        console.log('Ошибка', event);
      });
    }

    async getMessages() {
     this.socket?.send(JSON.stringify({content: '0', type: 'get old'}));
    }
      
    sendMessage(message: string) { 
      
      if(this.open) {
        clearInterval(this.intervalSendMessage);
        this.intervalSendMessage = null;
        this.socket?.send(JSON.stringify({content: message, type: 'message'}));
      }
      else
      {
        this.intervalSendMessage =  setInterval( () => {
          this.sendMessage(message) 
        }, 1000)
      }
    }
    disconnect() {
      this.socket?.close();
      clearInterval(this.intervalPing);
      this.intervalPing = null;
      this.socket = null;
    }
}
