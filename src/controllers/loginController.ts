import {Request, Response } from 'express';
import {getManager} from 'typeorm';
//Service imports
import { UserService } from '../service/userService';
//middlewares imports
import { AuthHandler } from '../midlleware/authHandle';
import bcrypt from 'bcrypt';
//import entity
import { User } from '../entity/userEntity';


class loginController{
    public async loginGen(req: Request, res:Response){
        const userService = new UserService();
        const authHandle = new AuthHandler();
        const user: User = await userService.getByEmail(req.body.email);
        const isPasswordCorrect: Boolean = await bcrypt.compare(
            req.body.password,
            user.password
        )
        if(!user || !isPasswordCorrect){
            res.json({
                sucess:false
            })
        }
        const token: string = authHandle.generateToken(user);
        res.header('token-auth', token).json({
            sucess:true,
            token
        })
    }
}

export default new loginController();