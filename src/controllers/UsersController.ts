import API, { ChangePassword, UpdateUserData } from '../modules/API/users-api';
import store from '../utils/Store';
import  AuthController  from './AuthController';


export class UsersController {
  private readonly api: any;

  constructor() {
    this.api = API;
  }

  async  changeUserData( data: UpdateUserData ) {
    try {
      await this.api.updateUser(data);
      await AuthController.fetchUser()
    } catch (e: any) {
      console.error('changeUserData:', e);
    }
  } 

  async getUserById (id: number) {
    try {
      const response =  await this.api.getUser(id);
      const newUserData = JSON.parse(response);
    } catch (e: any) {
      console.error('getUserById:', e);
    }
  }

  async changeUserPassword (data: ChangePassword ) {
    try {
      await this.api.changePassword(data);
    } catch (e: any) {
      console.error('getUserById:', e);
    }
  }
  async changeAvatar (data: FormData ) {
    try {
      const response =  await this.api.changeAvatar(data) as  any;
      const newUserData = JSON.parse(response);
      store.set('user', newUserData);
      store._state.user.avatar = `https://ya-praktikum.tech/api/v2/resources${newUserData.avatar}`;
      (document.getElementsByClassName('avatar')[0] as HTMLDivElement).style.backgroundImage=`url(${store._state.user.avatar})`;
      console.log( store._state.user);
    } catch (e: any) {
      console.error('changeAvatar error:', e);
    }
  }

  async searchUserByLogin(login: string) {
    try {
      const response =  await this.api.searchUser(login);
      const user = JSON.parse(response);
      console.log(user);
      store.set('search', user);
    } catch (e: any) {
      console.error('searchUserByLogin:', e);
    }
  }
} 

export default new UsersController();

