import store from '../utils/Store'
console.log(store)
export default function showModal(clas: string, e) {
    let modal =  document.getElementsByClassName(clas)[0]
    if (e.target.classList.contains('search_button') && store._state.search.length > 0 ) {
      document.getElementsByClassName(clas)[0].style.display = 'block';
    } 
    if (e.target.getAttribute('id') === 'button_add_chat') {
        if(modal.style.display === 'flex') {
            modal.style.display = 'none'
        } else {
            modal.style.display = 'flex';
        }
        // let deleteChat = document.getElementsByClassName ('modal_delete_chat')[0];
        // // let deleteChat = document.getElementsByClassName ('modal_delete_chat')[0];
        // if(deleteChat.style.display === 'flex') {
        //     document.getElementsByClassName(clas)[0].style.display = 'none';
        // } else {
        //     document.getElementsByClassName(clas)[0].style.display = 'flex';
        // }
    //   document.getElementsByClassName ('modal_delete_chat')[0].style.display = 'none';
    //   document.getElementsByClassName(clas)[0].style.display = 'flex';
    }
    if (e.target.getAttribute('id') === 'button_delete_chat') {
        if(modal.style.display === 'flex') {
            modal.style.display = 'none'
        } else {
            modal.style.display = 'flex';
        }
        // let addChat = document.getElementsByClassName ('modal_add_chat')[0];
        // if(addChat.style.display === 'flex') {
        //     document.getElementsByClassName(clas)[0].style.display = 'none';
        // } else {
        //     document.getElementsByClassName(clas)[0].style.display = 'flex';
        // }
    //   document.getElementsByClassName ('modal_add_chat')[0].style.display = 'none';
    //   document.getElementsByClassName(clas)[0].style.display = 'flex';
    }
    if (e.target.getAttribute('id') === 'button_add_user' ) {
        // let modal =  document.getElementsByClassName(clas)[0]
        if(modal.style.display === 'flex') {
            modal.style.display = 'none'
        } else {
            modal.style.display = 'flex';
        }
    } 
  }

