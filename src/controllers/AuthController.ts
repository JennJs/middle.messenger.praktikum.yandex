import API, { AuthAPI, SigninData, SignupData } from '../modules/API/auth-api';
import { store } from '../utils/Store';
import { router } from '../modules/router/Router';
import  ChatsController  from './ChatsController';

export class AuthController {
  private readonly api: AuthAPI;

  constructor() {
    this.api = API;
  }

  async signin(data: SigninData) {
    try {
      await this.api.signin(data);
      await this.fetchUser();
      await ChatsController.getChats();
      router.start();
      router.go('/settings');
      window.location.reload();
      console.log('signin')
    } catch (e) {
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
      await this.api.signup(data);
      await this.fetchUser();
      await ChatsController.getChats();
      router.go('/messenger');
      window.location.reload();
    } catch (e) {
      console.error('signup:', e);
    }
  }

  async fetchUser(): Promise<void> {
    try {
    const user: any = await this.api.read();
    const userData = JSON.parse(user) ;
    store.set('user', userData);
  } catch (e) {
    console.error(e);
  }
  }

  async logout() {
    try { 
      store.removeAllState();
      await this.api.logout();
      router.go('/');
      window.location.reload();
      console.log('user logout')
    } catch (e) {
        console.error(e);
    }
  }
}
export const authController = new AuthController();
