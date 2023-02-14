/* eslint-disable no-undef */
import Route from './Route';


export default class Router {

  static _instance: Router;

  rootQuery: string;
	routes: [];
	history;
	_currentRoute: any;

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
  
    use(pathname: string, block, props = {}) {
      const route =  new Route(pathname, block, {...props, rootQuery: this.rootQuery}); 

      this.routes.push(route);
      // Возврат this — основа паттерна "Builder" («Строитель»)
      return this;
    }
  
    start() {
      // Реагируем на изменения в адресной строке и вызываем перерисовку
      window.onpopstate = event => {
        console.log(event.currentTarget.location.pathname);
        this._onRoute(event.currentTarget.location.pathname);
      };
  
      this._onRoute(window.location.pathname);
    }
  
    _onRoute(pathname) {
      // console.log('history:', this.history);

      const route = this.getRoute(pathname);
      console.log('_currentRoute1 from Router', this._currentRoute)
      console.log('route from Router:', route);

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
  
    getRoute(pathname) {
      return this.routes.find(route => route.match(pathname));
    }
  }
