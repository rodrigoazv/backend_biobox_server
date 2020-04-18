import { Request, Response, Router } from 'express';
import { getManager } from 'typeorm';
//import service
import { UserService } from '../service/userService';
//import user entity
import { User } from '../entity/userEntity';


class userController {
    public async index(req: Request, res: Response){
        const userService = new UserService();
        const user: User[] = await userService.getAll();
        return res.json(user);
    }
}

export default new userController;