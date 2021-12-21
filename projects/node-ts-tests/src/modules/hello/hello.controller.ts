import { NextFunction, Request, Response } from 'express';

export class HelloController {

  public hello(req: Request, res: Response, next: NextFunction): void {
    res.json({ message: "Hello World!" })
  }

  public getHello(req: Request, res: Response, next: NextFunction): void {
    const name = req.params.name
    res.json({ message: `Hello ${name}` })
  }

  public sayHelloTo(req: Request, res: Response, next: NextFunction): void {
    const to = req.body.sayHelloTo
    res.json({ message: `Hello ${to}` })
  }
}