enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

type Options = {
    method?: METHODS;
    headers?: Record<string, string>;
    data?: Record<string, any>;
    timeout?: number;
};

function queryStringify(data: Record<string, any>): string {
    if (typeof data !== 'object') {
      throw new Error('Data must be object');
    }
    const keys: string[] = Object.keys(data);
    return keys.reduce((result, key, index) => {
      return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
    }, '?');
}

export class HTTPTRequest {

    get = (url: string , options: Options = {}): Promise<XMLHttpRequest> => {
      return this.request(url + queryStringify((options.data as  Record<string, any>)), {...options, method: METHODS.GET}, options.timeout);
    };
  
    post = (url: string, options: Options = {}): Promise<XMLHttpRequest> => {
        return this.request(url, {...options, method: METHODS.POST}, options.timeout);
    };
    
    put = (url: string, options: Options = {}): Promise<XMLHttpRequest> => {
        return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
    };
    
    delete = (url: string, options: Options = {}): Promise<XMLHttpRequest> => { 
        return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
    };
    
    request = (url: string, options: Options = {}, timeout = 5000): Promise<XMLHttpRequest> => {
        const {headers = {}, method, data} = options;
    
        return new Promise(function(resolve, reject) {
        if (!method) {
            reject('No method');
            return;
        }
    
        const xhr = new XMLHttpRequest();
        const isGet = method === METHODS.GET;
    
        xhr.open(
            method, 
            isGet && !!data
            ? `${url}${queryStringify(data)}`
            : url,
        );
    
        Object.keys(headers).forEach(key => {
            xhr.setRequestHeader(key, headers[key]);
        });
    
        xhr.onload = function() {
            resolve(xhr);
        };
    
        xhr.onabort = reject;
        xhr.onerror = reject;
    
        xhr.timeout = timeout;
        xhr.ontimeout = reject;
    
        if (isGet || !data) {
            xhr.send();
        } else {
            xhr.send((data as  XMLHttpRequestBodyInit));
        }
        });
    };
}