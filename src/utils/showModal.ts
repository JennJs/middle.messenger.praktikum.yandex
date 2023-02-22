import store from '../utils/Store'

export default function showModal(clas: string, e: Event & { target: HTMLElement}) {
    let modal  =  document.getElementsByClassName(clas)[0] as HTMLElement
    if (e.target.classList.contains('search_button') && store._state.search.length > 0 ) {
      (document.getElementsByClassName(clas)[0]as HTMLElement).style.display = 'block';
    } 
    if (e.target.getAttribute('id') === 'button_add_chat') {
        if(modal.style.display === 'flex') {
            modal.style.display = 'none'
        } else {
            modal.style.display = 'flex';
        }
    }
    if (e.target.getAttribute('id') === 'button_delete_chat') {
        if(modal.style.display === 'flex') {
            modal.style.display = 'none'
        } else {
            modal.style.display = 'flex';
        }
    }
    if (e.target.getAttribute('id') === 'button_add_user' ) {
        if(modal.style.display === 'flex') {
            modal.style.display = 'none'
        } else {
            modal.style.display = 'flex';
        }
    } 
  }

