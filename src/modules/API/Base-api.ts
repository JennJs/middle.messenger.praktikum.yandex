import  HTTPRequest  from '../httpRequest/HttpRequest';


export default  class BaseAPI {
    // protected http: HTTPTransport;

    // protected constructor(endpoint: string) {
    //   this.http = new HTTPTransport(endpoint);
    // }
    // create() { throw new Error('Not implemented'); }

    // request() { throw new Error('Not implemented'); }

    // update() { throw new Error('Not implemented'); }

    // delete() { throw new Error('Not implemented'); }
    // public  create?(): Promise<unknown>;

    protected http: HTTPRequest;

    protected constructor(endpoint: string) {
      this.http = new HTTPRequest(endpoint);
    }
  
    public create?(data: unknown): Promise<unknown>;
  
    public request?(identifier?: string | number): Promise<unknown>;
  
    public update?(identifier: string | number, data: unknown): Promise<unknown>;
  
    public delete?(identifier: string | number): Promise<unknown>;
}
