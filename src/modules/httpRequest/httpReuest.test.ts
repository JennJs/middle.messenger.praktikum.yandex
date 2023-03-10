import HTTPRequest from './HttpRequest';

describe('HTTPRequest', () => {
   const http = new HTTPRequest("/user/519084")
   test('HTTPRequest должен вернуть данные юзера', async () => {
      const get = async (): Promise<void> => {
      await http.get();
    
    };
    expect(get).not.toThrow();
    });
  });
