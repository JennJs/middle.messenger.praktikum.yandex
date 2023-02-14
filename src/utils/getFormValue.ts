import { validate } from "./validation";

export function getFormValue(e: Event & { target: HTMLInputElement} ): boolean {
    e.preventDefault();
    let form  = document.forms[0];
    const dataForm: Record<string, any> = Object.fromEntries(new FormData(form).entries());
   
    if (validate(form)) {
      const values = form.elements;
  
      Object.entries(values).forEach( ([ , value ]) => {
        if (!value.classList.contains('user_settings')) {
         (value as HTMLInputElement).value = '' ;
        } 
      })
      console.log(dataForm);
      // e.target.setAttribute('disabled', '');
    //  return false;

    } 
    return false;
  }
