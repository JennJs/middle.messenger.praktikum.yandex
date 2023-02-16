import  BaseAPI  from './Base-api';


export interface SigninData {
    login: string;
    password: string;
  }
  
  export interface SignupData {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
  }
  
  export interface User {
    id: number;
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
    avatar: string;
  }
  
  export class UsersAPI extends BaseAPI {
    constructor() {
      super('/user');
    }
  
    signin(data: SigninData) {
      return this.http.post('/signin', data);
    }
  
  
    signup(data: SignupData) {
      return this.http.post('/signup', data);
    }
  
    read(): Promise<User> {
      return this.http.get('/user');
    }
  
    create = undefined;
    update = undefined;
    delete = undefined;
  }
  
  export default new UsersAPI();
