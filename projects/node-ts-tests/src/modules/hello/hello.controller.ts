import { NextFunction, Request, Response } from 'express';
import HelloService from './hello.service';

export class HelloController {

  public hello(req: Request, res: Response, next: NextFunction): void {
    res.json({ message: "Hello World!" })
  }

  public getHello(req: Request, res: Response, next: NextFunction): void {
    const name = req.params.name
    const message = HelloService.sayHello(name)
    res.json({ message })
  }

  public sayHelloTo(req: Request, res: Response, next: NextFunction): void {
    const to = req.body.sayHelloTo
    const message = HelloService.sayHello(to)
    res.json({ message })
  }
}