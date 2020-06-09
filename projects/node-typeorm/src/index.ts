import express from 'express';
import "reflect-metadata";
import {createConnection} from "typeorm";
import * as bodyParser from "body-parser";
import {CreateRoutes} from './routes'


createConnection().then(async connection => {

  // create express app
  const app = express();
  app.use(bodyParser.json());

  CreateRoutes(app)  

  // run app
  app.listen(8080);

  console.log("Express application is up and running on port 8080");

}).catch(error => console.log("TypeORM connection error: ", error));