// enum METHODS {
//     GET = 'GET',
//     POST = 'POST',
//     PUT = 'PUT',
//     DELETE = 'DELETE'
// }

// type Options = {
//     method?: METHODS;
//     headers?: Record<string, string>;
//     data?: Record<string, any>;
//     timeout?: number;
// };

// function queryStringify(data: Record<string, any>): string {
//     if (typeof data !== 'object') {
//       throw new Error('Data must be object');
//     }
//     const keys: string[] = Object.keys(data);
//     return keys.reduce((result, key, index) => {
//       return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
//     }, '?');
// }

// export class HTTPRequest {
//     static API_URL = 'https://ya-praktikum.tech/api/v2';
//     protected endpoint: string;
 
//     constructor(endpoint: string) {
//         this.endpoint = `${HTTPRequest.API_URL}${endpoint}`;
//         console.log(this.endpoint);
//     }

//     public get = (url: string , options: Options = {}): Promise<XMLHttpRequest> => {
//       return this.request(url + queryStringify((options.data as  Record<string, any>)), {...options, method: METHODS.GET}, options.timeout);
//     };
  
//     public post = (url: string, options: Options = {}): Promise<XMLHttpRequest> => {
//         console.log(options)
//         console.log(this.endpoint);
//         return this.request(this.endpoint + url, {...options, method: METHODS.POST}, options.timeout);
//     };
    
//     public put = (url: string, options: Options = {}): Promise<XMLHttpRequest> => {
//         return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
//     };
    
//     public delete = (url: string, options: Options = {}): Promise<XMLHttpRequest> => { 
//         return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
//     };
    
//     public request = (url: string, options: Options = {}, timeout = 5000): Promise<XMLHttpRequest> => {
//         // const {headers = {}, method, data} = options;
//         const {method, data} = options;

    
//         return new Promise(function(resolve, reject) {
//         if (!method) {
//             reject('No method');
//             return;
//         }
    
//         const xhr = new XMLHttpRequest();
//         const isGet = method === METHODS.GET;
    
//         xhr.open(
//             method, 
//             isGet && !!data
//             ? `${url}${queryStringify(data)}`
//             : url,
//         );
    
//         // Object.keys(headers).forEach(key => {
//         //     xhr.setRequestHeader(key, headers[key]);
//         // });
    
//         xhr.onload = function() {
//             resolve(xhr);
//         };
    
//         xhr.onabort = reject;
//         xhr.onerror = reject;
    
//         xhr.timeout = timeout;
//         xhr.ontimeout = reject;
    
//         xhr.setRequestHeader('Content-Type', 'application/json');

//         xhr.withCredentials = true;
//         xhr.responseType = 'json';

//         if (isGet || !data) {
//             xhr.send();
//         } else {
//             xhr.send(JSON.stringify((data as  XMLHttpRequestBodyInit)));
//         }
//         });
//     };
// }


export enum Method {
    Get = 'Get',
    Post = 'Post',
    Put = 'Put',
    Patch = 'Patch',
    Delete = 'Delete'
  }
  
  type Options = {
    method: Method;
    data?: any;
  };
  
  export default class HTTPRequest {
    static API_URL = 'https://ya-praktikum.tech/api/v2';
    protected endpoint: string;
  
    constructor(endpoint: string) {
      this.endpoint = `${HTTPRequest.API_URL}${endpoint}`;
    }
  
    public get<Response>(path = '/'): Promise<Response> {
      return this.request<Response>(this.endpoint + path);
    }
  
    public post<Response = void>(path: string, data?: unknown): Promise<Response> {
      return this.request<Response>(this.endpoint + path, {
        method: Method.Post,
        data,
      });
    }
  
    public put<Response = void>(path: string, data: unknown): Promise<Response> {
      return this.request<Response>(this.endpoint + path, {
        method: Method.Put,
        data,
      });
    }
  
    public patch<Response = void>(path: string, data: unknown): Promise<Response> {
      return this.request<Response>(this.endpoint + path, {
        method: Method.Patch,
        data,
      });
    }
  
    public delete<Response>(path: string, data?: unknown): Promise<Response> {
      return this.request<Response>(this.endpoint + path, {
        method: Method.Delete,
        data
      });
    }
  
    private request<Response>(url: string, options: Options = {method: Method.Get}): Promise<Response> {
      // let {method, data} = options;

      //работает все кроме formData
      let {
        headers = { 'Content-Type': 'application/json' },
        method,
        data,
      } = options
  
  
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        
       //работает все кроме formData
        if (!(data instanceof FormData)) {
          Object.keys(headers).forEach((key) => {
            xhr.setRequestHeader(key, headers[key])
          })
        }

        // else {
        //   headers = {}
        // }
        // if (!(data instanceof FormData)) {
        //   xhr.setRequestHeader('Content-Type', 'multipart/form-data');
        // }
        // else {
        //     headers = {}
        // }
        
        // xhr.setRequestHeader('Content-Type', 'multipart/form-data');
        // xhr.setRequestHeader('accept', 'application/json')
        // xhr.setRequestHeader('','');
        // xhr.setRequestHeader('Content-Type', 'application/json');
        
        xhr.withCredentials = true;
     
        xhr.onreadystatechange = (e) => {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status < 400) {
              resolve(xhr.response);
            } else {
              console.log('xhr.status: ', xhr.status)
              reject(xhr.response);
            }
          }
        };

        xhr.onabort = () => reject({reason: 'abort'});
        xhr.onerror = () => reject({reason: 'network error'});
        xhr.ontimeout = () => reject({reason: 'timeout'});
    
        if (method === Method.Get || !data) {
          xhr.send();
        } else if (data instanceof FormData) {
          xhr.send(data)
        } else {
          xhr.send(JSON.stringify(data));
        }
      });
    }
  }
  


