/* eslint-disable no-undef */
import { Route } from './Route';
import { store } from '../../utils/Store'
import  { authController }  from '../../controllers/AuthController';
import { chats, loginForm, page404, page500, signInForm, userChangeData, userChangePassword, userSettingsPage } from '../..';
import  ChatsController  from '../../controllers/ChatsController';
import Block from '../block/Block';


export class Router {

  private static _instance: Router;

  rootQuery: string;
	private routes: Route[];
	private history: History ;
	private _currentRoute: any;
  block: Block<Record<string, any>>

    constructor(rootQuery: string) {
      if (Router._instance) {
        return Router._instance;
      }
  
      this.routes = [];
      this.history = window.history;
      this._currentRoute = null;
      this.rootQuery = rootQuery;

      Router._instance = this;
    }
  
    use(pathname: string, block: Block<Record<string, any>>, props = {}) {
      const route =  new Route(pathname, block, {...props, rootQuery: this.rootQuery}); 
    
      this.routes.push(route);
      return this;
    }
  
    async start() {
      window.onpopstate = (event: PopStateEvent ) => {
        this._onRoute((event.currentTarget as Window).location.pathname);
      };
      await authController.fetchUser();

      if (!store._state.user) {
        this.go('/login');
        this.use('/login', loginForm)
           .use('/registration', signInForm )
      } else {
        await ChatsController.getChats(); 
        this.go('/')
        this.use('/login', loginForm)
            .use('/', chats) 
            .use('/registration', signInForm) 
            .use('/userSettings', userSettingsPage)
            .use('/userSettings/change-data', userChangeData) 
            .use('/userSettings/change-password', userChangePassword)
            .use('/500', page500) 
            .use('/404', page404)

       
        this._onRoute(window.location.pathname);
      }
      // await ChatsController.getChats(); 
      // this._onRoute(window.location.pathname);
    }
  
    _onRoute(pathname: string) {

      const route = this.getRoute(pathname);

      if (!route) {
        return;
      }
  
      if (this._currentRoute && this._currentRoute !== route) {
        this._currentRoute.leave();
      }
      this._currentRoute = route;

      route.render();
    }
  
    go(pathname: string) {
      this.history.pushState({}, "", pathname);
      this._onRoute(pathname);
    }

    getRoute(pathname: string) {
      return this.routes.find(route => route.match(pathname));
    }
  }

  export const router = new Router('#root');
