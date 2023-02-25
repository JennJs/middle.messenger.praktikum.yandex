import  BaseAPI  from './Base-api';

export interface ChangePassword {
  oldPassword: string;
  newPassword: string;
}

export interface UpdateUserData {
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string,
}

  export class UsersAPI extends BaseAPI {
    constructor() {
      super('/user');
    }
  
    updateUser(data: UpdateUserData) {
      return this.http.put('/profile', data);
    }
  
    getUser(id: number) {
      return this.http.get(`/${id}`);
    }
 
    changePassword(data: ChangePassword) {
      return this.http.put('/password', data);
    }
    
    changeAvatar (data: FormData) {
      return this.http.put('/profile/avatar', data)
    }

    searchUser(login: string) {
      return this.http.post('/search', { login: login })
    }
  
    create = undefined;
    delete = undefined;
  }
  
  export default new UsersAPI();
