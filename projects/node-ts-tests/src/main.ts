import cors from 'cors';
import express, { Application, Router } from 'express';

import { HelloRoutes } from "./modules/hello/hello.routes"

class Server {

  private app: Application;

  public constructor() {
    this.app = express();

    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));

    this.setupRoutes()
  }

  public listen(): void {
    this.app.listen(3000, '0.0.0.0');
  }

  private setupRoutes() {
    const routes = [
      new HelloRoutes()
    ]

    routes.forEach(item => this.app.use('/', item.router))
  }

}

const server = new Server()

server.listen()