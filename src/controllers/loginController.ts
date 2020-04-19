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
            res.send(404).json({
                sucess:false
            })
        }
        const token: String = authHandle.generateToken(user);
        res.send(200).json({
            sucess:true,
            token
        })
    }
}
