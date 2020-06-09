import {Request, Response} from "express";
import {getManager} from "typeorm";
import {User} from "../entity/user";

export default class UserController {

    getAll = async (request: Request, response: Response) => {
        const usersRepository = getManager().getRepository(User)

        // load all users
        const users = await usersRepository.find();

        response.send(users);
    }

    async newUser(request: Request, response: Response) {
        const postRepository = getManager().getRepository(User);

        let newUser = new User()
        newUser.firstName = this.makeid(5)
        newUser.secondName = this.makeid(7)
        newUser.email = this.makeid(3) + '@' + this.makeid(3) + '.com'
        newUser.accountCreated = new Date()

        console.log(newUser)
        


        // create a real post object from post json object sent over http
        // const newPost = postRepository.create(request.body);

        await postRepository.save(newUser);

        response.send(newUser);
    }

    makeid(length: number) {
        let result           = '';
        let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }

}