/* eslint-disable no-undef */
import Route from './Route';
import store from '../../utils/Store'
import  AuthController  from '../../controllers/AuthController';
import { loginForm, signInForm } from '../..';
import  ChatsController  from '../../controllers/ChatsController';


export default class Router {

  static _instance: Router;

  rootQuery: string;
	routes: [];
	history: History ;
	_currentRoute: any;
  block: HTMLElement

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
  
    use(pathname: string, block: any, props = {}) {
      const route =  new Route(pathname, block, {...props, rootQuery: this.rootQuery}); 
    
      this.routes.push(route);
      return this;
    }
  
    async start() {
      window.onpopstate = (event: PopStateEvent ) => {
        this._onRoute((event.currentTarget as Window).location.pathname);
      };
      await AuthController.fetchUser();

      if (!store._state.user) {
        this.go('/login')
        this.use('/login', loginForm)
           .use('/registration', signInForm )
      } 
      await ChatsController.getChats(); 
      this._onRoute(window.location.pathname);
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
