import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express'

import { AdminBio } from "../entity/adminEntity";
import * as dotenv from "dotenv";
dotenv.config();


export class AuthAdmin {

    verifyToken (req: Request, res: Response, next: NextFunction){
        const pickToken = <string>req.header('token');
        if(!pickToken) {
          return res.status(403).json({
          auth: false,
          err: 'no token',
          
        })}
        try{
        jwt.verify(pickToken, process.env.SECRET_KEY_ADMIN || 'authorization',(err: any, result:any)  => {
            if(err){
              return res.status(404).json({
                  auth: false,
                  message: 'invalid token'
                })
            }
            if(!err){
                req.userId = result.id; 
                next();  
          }
        });
        
        
      } catch {
        res.status(404).json({
          auth: false,
          message: 'Invalid auth'
      }
      )}  
}
    generateToken(user: AdminBio){
        const token = jwt.sign(
          {
            id: user.id
          },
          process.env.SECRET_KEY_ADMIN || 'authorization',
          {
            expiresIn: "1 days"
          }
        );
    
        return token;
      }
    

}