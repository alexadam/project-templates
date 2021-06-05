import express from 'express';
import { HelloController } from './controller';

export class HelloRoutes {

    private readonly _router = express.Router();
    private controller = new HelloController();

    constructor() {
        this.routesSetup()
    }

    get router(): express.Router {
        return this._router;
      }

    private routesSetup() {
        this._router.get("/", this.controller.index);
    }
}