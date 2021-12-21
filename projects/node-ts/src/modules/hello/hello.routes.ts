import express from 'express';
import { HelloController } from './hello.controller';

export class HelloRoutes {

  private readonly _router = express.Router();
  private controller = new HelloController();

  constructor() {
    this.routesSetup()
  }

  get router(): express.Router {
    return this._router
  }

  private routesSetup() {
    this._router.get("/hello", this.controller.hello)
    this._router.get("/helloTo/:name", this.controller.getHello)

    this._router.post("/hello", this.controller.sayHelloTo)
  }
}