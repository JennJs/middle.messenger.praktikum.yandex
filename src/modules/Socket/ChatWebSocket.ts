// import { WS } from "../../utils/WebSocket"
import store from '../../utils/Store'

import AuthController from "../../controllers/AuthController";
import  ChatsController  from "../../controllers/ChatsController";
import { addLastMessage } from './actions';


// export default class AppWS extends WS {
//     chatId: number
//     intervalId: any
  
//     constructor() {
//       super('wss://ya-praktikum.tech/ws/chats')
//     }
  
//     async connect(chatId: number) {
//       if (chatId === this.chatId) {
//         return
//       } else {
//         this.disconnect()
//         clearInterval(this.intervalId)
//         this.chatId = chatId
//       }
  
//       const userId = store._state.user.id
//       const token = await AppWS.get_token(chatId)
  
//       if (token) {
//         super._connect(
//           userId,
//           chatId,
//           token,
//           (ev: { type: string } & { [key: string]: any }) => {
//             try {
//               wsActions[ev.type](ev)
//             } catch (e) {
//               console.error(`Not find WS action "${ev.type}'`)
//             }
//           }
//         )
  
//         this.intervalId = setInterval(() => {
//           this.send({ type: 'ping' })
//         }, 10000)
//       }
//     }
  
//     private static get_token(chatId: number) {
//       return chatApi.get_token(chatId)
//     }
//   }

interface IWebSocketChat {
  connect: (args: IConnectFunction) => Promise<IWebSocketChat>;
  sendMessage: (message: string) => void;
  getMessages: () => void;
}
  
interface IConnectFunction {
  chatId: number;
  messages: (msg: Message[] | Message) => void;
  opened: () => void;
  closed?: () => void;
  failed?: () => void;
}
type Message = {
  id: number;
  user_id: number;
  chat_id: number;
  type: string;
  time: string;
  content: string;
  is_read: boolean;
  file: null;
};


// export class ChatWebSocket  {
//   private static _instance: ChatWebSocket;

//   private baseUrl = 'wss://ya-praktikum.tech/ws/chats';
//   private socket: WebSocket | null;
//   private interval: number | null;

//   static get instance() {
//     if (this._instance) {
//       return this._instance;
//     }
//     this._instance = new this();
//     return this._instance;
//   }

//   getMessages() {
//     this.socket?.send(JSON.stringify({content: '0', type: 'get old'}));
//   }

//   sendMessage(message: string) {
//     console.log('socket from sendMessage:', this.socket)
//     await 
//     console.log('socket?.readyState from sendMessage:', this.socket?.readyState)


//     this.socket?.send(JSON.stringify({content: message, type: 'message'}));
//   }

//   async connect(chatId: number) {
//     console.log(chatId)
  

//     // console.log('this.socket?.readyState:', this.socket?.readyState)

//     // if (this.socket?.readyState === 1) {
//     //   this.clearInterval();
//     //   this.disconnect();
//     // }

//      const token = await ChatsController.getToken(chatId);
//      console.log(token)
//      const userId = store._state.user.id;

//      const socketURL = this.baseUrl + `/${userId}/${chatId}/${token}`;
//      console.log('socketURL:', socketURL)
//      this.socket = new WebSocket(socketURL);
//      console.log('socket:', this.socket)


//     this.socket.addEventListener('message', (e) => {
//       try {
//         const data = JSON.parse(e.data);
//         const message: Message[] = Array.isArray(data) ? (data as []).reverse() : data;
//         // messages(message);
//         console.log('Получены данные', data);
//       } catch (error) {
//         // messages([]);
//       }
//     });

//     this.socket?.addEventListener('open', () => {
//       // opened();
//       console.log('Соединение установлено');
//     });

//     this.socket?.addEventListener('close', (e) => {
//       // closed && closed();
//       if (e.wasClean) {
//             console.log('Соединение закрыто чисто');
//           } else {
//             console.log('Обрыв соединения');
//           }
        
//           console.log(`Код: ${e.code} | Причина: ${e.reason}`);
//     });

//     this.socket?.addEventListener('error', (e) => {
//       // failed && failed();
//       console.log('Ошибка', e.message);
//     });

//     return this;
//   }

//   clearInterval() {
//     clearInterval(this.interval!);
//     this.interval = null;
//   }

//   disconnect() {
//     this.socket?.close();
//     this.socket = null;
//   }
// }

// export default new ChatWebSocket();


export class ChatWebSocket  {

    
    protected userId: number
    protected socket: WebSocket
    protected open: boolean = false;
    protected intervalSendMessage: any
    protected intervalPing: any


    // const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`); 
    async connect(userId: number, chatId: number, token: string, message: string ) {
      // console.log('userId:', userId , 'chatId:', chatId, 'token:', token, 'message:', message );
      this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`); 
      console.log(this.socket.readyState);
      if (this.socket?.readyState === 1) {
        this.disconnect();
      }
      this.socket.addEventListener('open', () => {
        console.log('Соединение установлено');
        this.open = true;
        this.getMessages()

        this.intervalPing = setInterval(() => {
          this.socket.send(JSON.stringify({ type: 'ping' }))
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
          const message: Message[] = Array.isArray(data) ? (data as []).reverse() : data;
          console.log('Получены данные', data);
          if (Array.isArray(message) ) {
            store.set('messages', message );
          } else if (message.type === 'message') {
            addLastMessage(message);
          }
          // store.set('messages', message );
      });
      
      this.socket.addEventListener('error', event => {
        console.log('Ошибка', event.message);
      });
    }

    getMessages() {
      this.socket?.send(JSON.stringify({content: '0', type: 'get old'}));
    }
      
    sendMessage(message: string) { 
      console.log(this.open)
      console.log(message)

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
    }
}
