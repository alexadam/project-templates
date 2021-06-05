import { NextFunction, Request, Response } from 'express';

export class HelloController {

    public index(req: Request, res: Response, next: NextFunction): void {
        res.json({ message: "Hello World!" })
    }
}