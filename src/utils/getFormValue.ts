import AuthController from "../controllers/AuthController";
import UsersController from "../controllers/UsersController";
import { SigninData, SignupData, ChangePassword } from "../modules/API/auth-api";
import { validate } from "./validation";
// import SignupAPI from '../modules/API/auth-api';

export async function getFormValue(e: Event & { target: HTMLInputElement} ): Record<string, any> {
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
      // e.target.setAttribute('disabled', '');
    //  return false;
    console.log(dataForm);
    // SignupAPI.create(dataForm);
    if (form.getAttribute('id') ==='signin_form') await AuthController.signup(dataForm as SignupData);
    if (form.getAttribute('id') ==='login_form') await AuthController.signin(dataForm as SigninData);
    if (form.getAttribute('id') === 'change_data_form' ) await UsersController.changeUserData(dataForm as SignupData);
    if (form.getAttribute('id') === 'change_pass_form' ) await UsersController.changeUserPassword(dataForm as ChangePassword);

    // if (form.getAttribute('id') === 'change_data_form' ) await UsersController.getUserById(333200);


    return dataForm;
    } 
   
  }
