import {Request, Response } from 'express';
//Service imports
import { AdminService } from '../service/adminService';
//middlewares imports
import { AuthAdmin } from '../midlleware/authAdmin';
import bcrypt from 'bcrypt';
//import entity
import { AdminBio } from '../entity/adminEntity';


class adminLoginController{
    public async loginGen(req: Request, res:Response){
        try{
            const userService = new AdminService();
            const authHandle = new AuthAdmin();
            const user: AdminBio = await userService.getByEmail(req.body.email);
            const isPasswordCorrect: Boolean = await bcrypt.compare(
                req.body.password,
                user.password
            )
            if(!user || !isPasswordCorrect){
                res.status(403).json({
                    sucess:false
                })
            }else{
                const token: string = authHandle.generateToken(user);
                res.header('token-auth', token).json({
                    sucess:true,
                    user: user.id,
                    token,
                })}
        }
        catch{
            res.status(404).json({
                sucess:false
            })
        }
        
       
    }
}

export default new adminLoginController();