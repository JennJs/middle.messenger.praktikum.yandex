// import { WS } from "../../utils/WebSocket"
// import store from '../../utils/Store'

import AuthController from "../../controllers/AuthController";
import  ChatsController  from "../../controllers/ChatsController";


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

export class ChatWebSocket implements IWebSocketChat {
  private static _instance: ChatWebSocket;

  private baseUrl = 'wss://ya-praktikum.tech/ws/chats';
  private socket: WebSocket | null;
  private interval: number | null;

  static get instance() {
    if (this._instance) {
      return this._instance;
    }
    this._instance = new this();
    return this._instance;
  }

  getMessages() {
    this.socket?.send(JSON.stringify({content: '0', type: 'get old'}));
  }

  sendMessage(message: string) {
    this.socket?.send(JSON.stringify({content: message, type: 'message'}));
  }

  async connect({chatId, messages, opened, closed, failed}: IConnectFunction) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.clearInterval();
      this.disconnect();
    }

    const data = await ChatsController.getToken(chatId);
    console.log('token:', data);
    const user = await AuthController.fetchUser();

    const WEB_socket_URL = this.baseUrl + `/${user.id}/${chatId}/${data.token}`;

    this.socket = new WebSocket(WEB_socket_URL);

    this.socket.addEventListener('message', (e) => {
      try {
        const data = JSON.parse(e.data);
        const message: Message[] = Array.isArray(data) ? (data as []).reverse() : data;
        messages(message);
      } catch (error) {
        messages([]);
      }
    });

    this.socket?.addEventListener('open', () => {
      opened();
    });

    this.socket?.addEventListener('close', (e) => {
      if (e.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }
    
      console.log(`Код: ${e.code} | Причина: ${e.reason}`);
      // closed && closed();
    });

    this.socket?.addEventListener('error', (e) => {
      console.log('Ошибка', e.message);
      failed && failed();
    });

    return this;
  }

  clearInterval() {
    clearInterval(this.interval!);
    this.interval = null;
  }

  disconnect() {
    this.socket?.close();
    this.socket = null;
  }
}
