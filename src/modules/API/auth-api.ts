import  BaseAPI  from './Base-api';

// const SignupAPIInstance = new HTTPTRequest('https://ya-praktikum.tech/api/v2');
// // let body = getFormValue();
// // console.log(body);
// export class AuthAPI extends BaseAPI {
//     create(data) {
//         // let body = getFormValue();
//         // console.log(body);
//         // Здесь уже не нужно писать полный путь /api/v1/chats/
//         return SignupAPIInstance.post('auth/signup', data);
//     }

//     request() {
//         // Здесь уже не нужно писать полный путь /api/v1/chats/
//         return SignupAPIInstance.get('/full');
//     }
// }
// export default  SignupAPI;

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
  
  export class AuthAPI extends BaseAPI {
    constructor() {
      super('/auth');
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
  
    logout() {
      return this.http.post('/logout');
    }
  
    create = undefined;
    update = undefined;
    delete = undefined;
  }
  
  export default new AuthAPI();
