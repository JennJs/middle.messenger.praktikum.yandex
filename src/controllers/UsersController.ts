import API, { AuthAPI, SigninData, SignupData, ChangePassword } from '../modules/API/users-api';
import store from '../utils/Store';
// import MessagesController from './MessagesController';


export class UsersController {
  private readonly api: UserAPI;

  constructor() {
    this.api = API;
    console.log(this.api);
  }

  async  changeUserData( data: SignupData ) {
    try {
      // console.log(data);

      const response =  await this.api.updateUser(data);
      const newUserData = JSON.parse(response);
      console.log(newUserData);

      store.set('user', newUserData);
      console.log(store)

      // (new Router()).go('/userSettings');
      console.log('changeUserData')
    } catch (e: any) {
      console.error('changeUserData:', e);
    }
  }
//  id = 333200;
  async getUserById (id: number) {
    try {
      const response =  await this.api.getUser(id);
      const newUserData = JSON.parse(response);
      console.log(newUserData);
    } catch (e: any) {
      console.error('getUserById:', e);
    }
  }

  async changeUserPassword (data: ChangePassword ) {
    try {
      console.log(data);
      const response =  await this.api.changePassword(data);
      // const newUserData = JSON.parse(response);
      console.log(response);
    } catch (e: any) {
      console.error('getUserById:', e);
    }
  }
  async changeAvatar (data: FormData ) {
    try {
      const response =  await this.api.changeAvatar(data);
      console.log('response:', response);

      const newUserData = JSON.parse(response);
      store.set('user', newUserData);
      store._state.user.avatar = `https://ya-praktikum.tech/api/v2/resources${newUserData.avatar}`;
      document.getElementsByClassName('avatar')[0].style.backgroundImage=`url(${store._state.user.avatar})`;
      console.log( store._state.user);
    } catch (e: any) {
      console.error('changeAvatar error:', e);
    }
  }

  async searchUserByLogin(login: string) {
    try {
      // console.log(login);
      const response =  await this.api.searchUser(login);
      // console.log(response);

      const user = JSON.parse(response);
      console.log(user);

      store.set('search', user);
      // console.log(user);
    } catch (e: any) {
      console.error('searchUserByLogin:', e);
    }
  }
} 

export default new UsersController();

