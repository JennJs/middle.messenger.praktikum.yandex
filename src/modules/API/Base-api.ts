import  HTTPRequest  from '../httpRequest/HttpRequest';


export default  class BaseAPI {
  
    protected http: HTTPRequest;

    protected constructor(endpoint: string) {
      this.http = new HTTPRequest(endpoint);
    }
  
    public create?(data: unknown): Promise<unknown>;
  
    public request?(identifier?: string | number): Promise<unknown>;
  
    public update?(identifier: string | number, data: unknown): Promise<unknown>;
  
    public delete?(identifier: string | number): Promise<unknown>;
}
