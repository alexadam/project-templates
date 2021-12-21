import cors from 'cors';
import express, { Application, Router } from 'express';

import { HelloRoutes } from "./modules/hello/hello.routes"

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const routes = [
  new HelloRoutes()
]

routes.forEach(item => app.use('/', item.router))

app.listen(3000, '0.0.0.0');

// for tests
export default app