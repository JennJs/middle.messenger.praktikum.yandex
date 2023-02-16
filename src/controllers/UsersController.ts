import API, { AuthAPI, SigninData, SignupData } from '../modules/API/users-api';
import store from '../utils/Store';
import Router from '../modules/router/Router';
// import MessagesController from './MessagesController';

export class UsersController {
  private readonly api: UserAPI;

  constructor() {
    this.api = API;
    // console.log(this.api);
  }

  
  // async getUser() {
  //   const user = await this.api.read();
  //   console.log(user);

  //   store.set('user', user);
  // }
  // public async getUser() {
  //   this.api.read()
  //            .then( data => console.log(data));
  // }
} 
// store.set('user', data)


export default new UsersController();

