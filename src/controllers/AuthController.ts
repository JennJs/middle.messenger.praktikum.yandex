import API, { AuthAPI, SigninData, SignupData } from '../modules/API/auth-api';
import store from '../utils/Store';
import Router from '../modules/router/Router';
// import MessagesController from './MessagesController';

export class AuthController {
  private readonly api: AuthAPI;

  constructor() {
    this.api = API;
    // console.log(this.api);
  }

  async signin(data: SigninData) {
    const data1 = data;
    try {
      // console.log(data1);
      const response =  await this.api.signin(data);
      await this.fetchUser();
      (new Router()).go('/userSettings');
      console.log('signin ')
    } catch (e: any) {
    //   console.log(data);
      console.error('signin:', e);
    //   if (e.reason == "User already in system") {
    //     this.logout();
    //     this.signin(data1);
    }
  }

  async signup(data: SignupData) {
    try {
      const response = await this.api.signup(data);
      const userData = await this.fetchUser();
      Router.go('/login');
    } catch (e: any) {
      console.error('signup:', e.message);
    }
  }

  async fetchUser() {
    const user = await this.api.read();
    console.log(user);
    store.set('user', user);
    console.log(store._state.user);
  }

  async logout() {
    try {
      await this.api.logout();
      store.set('user', {});
      (new Router()).go('/login');
      console.log('user logout')
    } catch (e: any) {
        console.error(e);
    }
  }
}

export default new AuthController();
