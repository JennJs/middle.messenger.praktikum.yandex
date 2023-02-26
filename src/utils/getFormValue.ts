import { authController } from "../controllers/AuthController";
import UsersController from "../controllers/UsersController";
import { SigninData, SignupData } from "../modules/API/auth-api";
import {ChangePassword, UpdateUserData} from '../modules/API/users-api'
import { validate } from "./validation";

export async function getFormValue(e: Event & { target: HTMLInputElement} ) {
    e.preventDefault();
    let form  = document.forms[0];
    const dataForm: Record<string, any> = Object.fromEntries(new FormData(form).entries());
   
    if (validate(form)) {
      const values = form.elements;
      Object.entries(values).forEach( ([ , value ]) => {
        if (!value.classList.contains('user_change_data')) {
         (value as HTMLInputElement).value = '' ;
        } 
      })

      if (form.getAttribute('id') ==='signin_form') await authController.signup(dataForm as SignupData);
      if (form.getAttribute('id') ==='login_form') await authController.signin(dataForm as SigninData);
      if (form.getAttribute('id') === 'change_data_form' ) await UsersController.changeUserData(dataForm as UpdateUserData);
      if (form.getAttribute('id') === 'change_pass_form' ) await UsersController.changeUserPassword(dataForm as ChangePassword);

      return dataForm;
    } 
  }
