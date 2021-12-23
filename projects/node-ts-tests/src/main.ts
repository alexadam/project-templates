import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import AppError, { HttpStatusCode } from './custom-error';
import pino from 'pino'

import { HelloRoutes } from "./modules/hello/hello.routes"

export const Logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      levelFirst: true,
      translateTime: "yyyy-mm-dd, h:MM:ss TT",
    }
  }
});

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//
// 
// Setup routes

const routes = [
  new HelloRoutes()
]

routes.forEach(item => app.use('/', item.router))

//
// 
// return error for all routes that are not matched 

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl}`, HttpStatusCode.NOT_FOUND))
});

// 
// 
// Error Handling Middleware

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500

  if (err instanceof AppError) {
    statusCode = err.statusCode
  }

  Logger.error(err.message)

  res.status(statusCode).json({
    type: 'error',
    message: err.message
  });
});


const server = app.listen(3000, '0.0.0.0');

// for tests
export default server