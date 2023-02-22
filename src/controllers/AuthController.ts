import API, { AuthAPI, SigninData, SignupData } from '../modules/API/auth-api';
import store from '../utils/Store';
import Router from '../modules/router/Router';

export class AuthController {
  private readonly api: AuthAPI;

  constructor() {
    this.api = API;
  }

  async signin(data: SigninData) {
    const data1 = data;
    try {
      const response =  await this.api.signin(data);
      console.log(response)
      await this.fetchUser();
      (new Router()).go('/userSettings');
      console.log('signin ')
    } catch (e: any) {
      console.error('signin:', e
      );
      if (e == "User already in system") {
        this.logout();
        console.log('in system')
      }
    }
  }

  async signup(data: SignupData) {
    try {
      const response = await this.api.signup(data);
      await this.fetchUser();
      (new Router()).go('/userSettings');
    } catch (e: any) {
      console.error('signup:', e);
    }
  }

  async fetchUser() {
    try {
    const user: any = await this.api.read();
    const userData = JSON.parse(user);
    console.log(userData);
    store.set('user', userData);
  } catch (e: any) {
    console.error(e);
  }
  }

  async logout() {
    try { 
      store.removeState('user');
      await this.api.logout();
      (new Router()).go('/login');
      console.log('user logout')
    } catch (e: any) {
        console.error(e);
    }
  }
}

export default new AuthController();
