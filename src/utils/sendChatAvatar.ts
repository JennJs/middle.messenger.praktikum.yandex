import  ChatsController  from "../controllers/ChatsController";
import { store } from "./Store";

export  function sendChatAvatar(e: Event & { target: HTMLInputElement}) {
    e.preventDefault();
    let target = e.target;
    let id = store._state.currentChat[0].id
    let formData = new FormData();
     
    formData.append("avatar", (target.files![0])) ;
    formData.append("chatId", (id)) ;

    ChatsController.changeChatAvatar(formData);
}
