import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express'

import { User } from "../entity/userEntity";
import * as dotenv from "dotenv";
dotenv.config();


export class AuthHandler {

    verifyToken (req: Request, res: Response, next: NextFunction){
        const pickToken = <string>req.header('authorization');
        if(!pickToken) {
          return res.status(403).json({
          auth: false,
          err: 'no token',
          
        })}
        try{
        jwt.verify(pickToken, process.env.SECRET_KEY || 'authorization',(err: any, result:any)  => {
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
          message: 'invalid token'
      }
      )}  
}
    generateToken(user: User){
        const token = jwt.sign(
          {
            id: user.id
          },
          process.env.SECRET_KEY || 'authorization',
          {
            expiresIn: 60 * 60 * 60 * 60
          }
        );
    
        return token;
      }
    

}