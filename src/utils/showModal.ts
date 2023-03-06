import { store } from '../utils/Store'

export default function showModal(clas: string, e: Event & { target: HTMLElement}) {
    let modal  =  document.getElementsByClassName(clas)[0] as HTMLElement
    if (e.target.classList.contains('search_button') && store._state.search.length > 0 ) {
      (document.getElementsByClassName(clas)[0]as HTMLElement).style.display = 'block';
    } 
    if (e.target.getAttribute('id') === 'button_add_chat') {
        let modalDelete = document.getElementsByClassName('modal_delete_chat')[0] as HTMLDivElement;
        if(modal.style.display === 'flex') {
            modal.style.display = 'none'
        } else {
            modal.style.display = 'flex';
            modalDelete.style.display = 'none';
        }
    }
    if (e.target.getAttribute('id') === 'button_delete_chat') {
        let modalAdd = document.getElementsByClassName('modal_add_chat')[0] as HTMLDivElement;
        if(modal.style.display === 'flex') {
            modal.style.display = 'none'
        } else {
            modal.style.display = 'flex';
            modalAdd.style.display = 'none';
        }
    }
    if (e.target.getAttribute('id') === 'button_add_user' ) {
        let modalDelete = document.getElementsByClassName('modal_delete_user')[0] as HTMLDivElement;
        let buttonDelete = document.getElementById('button_delete_user') as HTMLButtonElement; 
        if (modalDelete.style.display === "flex") {
            modalDelete.style.display = "none"
            buttonDelete.style.display = "block"

        }
        modal.style.display = 'flex';
    
    } 
    if ( e.target.getAttribute('id') === 'button_delete_user' ) {
        let modalAdd = document.getElementsByClassName('modal_add_user')[0] as HTMLDivElement;
        let buttonAdd = document.getElementById('button_add_user') as HTMLButtonElement; 
        if(modalAdd.style.display === 'flex') {
            modalAdd.style.display = 'none';
            buttonAdd.style.display = "block"
        }
        modal.style.display = 'flex';
    }
  }

