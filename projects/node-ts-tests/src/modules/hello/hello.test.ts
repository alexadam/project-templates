import app from '../../main';
import request from 'supertest';
import HelloService from './hello.service';

describe("demo test", () => {
  it("should be equal", () => {
    expect(1).toBe(1)
  })
})

const testTarget = app // OR: 'http://localhost:3000'; 

describe('Test REST Endpoint', () => {
  it('Request /hello should return Hello World!', async () => {
    const result = await request(testTarget).get('/hello').send();
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject({ message: "Hello World!" })
  });

  it('Request /helloTo/test should return Hello test!', async () => {
    const result = await request(testTarget).get('/helloTo/test').send();
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject({ message: "Hello test" })
  });

  it('POST Request /hello should return Hello test2!', async () => {
    const result = await request(testTarget).post('/hello').send({ sayHelloTo: 'test2' });
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject({ message: "Hello test2" })
  });
});

///

describe("Test Hello Service", () => {
  it("should say Hello World", () => {
    const result = HelloService.sayHello('World')
    expect(result).toBe('Hello World')
  })
})

afterAll(done => {
  done();
});