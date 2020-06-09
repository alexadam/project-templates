import express, { Application } from 'express';
import UserController from './controller/user'

export function CreateRoutes(app: Application) {
    const userController = new UserController()

    app.get('/', (req, res, next) => {
        const helloMessage = 'hello world!'
        res.send(helloMessage);
    })
    app.get('/users', (req, res, next) => {
        userController.getAll(req, res)
                    .then(() => next)
                    .catch(err => next(err))
    })
    // 
    // Only for test
    app.get('/newuser', (req, res, next) => {
        userController.newUser(req, res)
                    .then(() => next)
                    .catch(err => next(err))
    })
}

