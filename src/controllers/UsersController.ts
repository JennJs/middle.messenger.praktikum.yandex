import API, { ChangePassword, UpdateUserData } from '../modules/API/users-api';
import { store } from '../utils/Store';
import  { authController }  from './AuthController';


export class UsersController {
  private readonly api: any;

  constructor() {
    this.api = API;
  }

  async  changeUserData( data: UpdateUserData ) {
    try {
      await this.api.updateUser(data);
      await authController.fetchUser()
    } catch (e) {
      console.error('changeUserData:', e);
    }
  } 

  async getUserById (id: number) {
    try {
      const response =  await this.api.getUser(id);
      JSON.parse(response);
    } catch (e) {
      console.error('getUserById:', e);
    }
  }

  async changeUserPassword (data: ChangePassword ) {
    try {
      await this.api.changePassword(data);
    } catch (e) {
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
    } catch (e) {
      console.error('changeAvatar error:', e);
    }
  }

  async searchUserByLogin(login: string) {
    try {
      const response =  await this.api.searchUser(login);
      const user = JSON.parse(response);
      store.set('search', user);
    } catch (e) {
      console.error('searchUserByLogin:', e);
    }
  }
} 

export default new UsersController();

