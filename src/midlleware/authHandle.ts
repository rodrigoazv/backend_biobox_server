import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express'

import { User } from "../entity/userEntity";
import * as dotenv from "dotenv";
dotenv.config();

interface IPayload{
  id: string,
  iat: number
}

export class AuthHandler {

    verifyToken (req: Request, res: Response, next: NextFunction){
      const pickToken = req.header('token');
      if(!pickToken) return res.json({
        err: 'acess danied'
      })
      const payload = jwt.verify(pickToken, process.env.SECRET_KEY || 'token') as IPayload;
      req.userId = payload.id;
      next();
    }

    generateToken(user: User){
        const token = jwt.sign(
          {
            id: user.id
          },
          process.env.SECRET_KEY || 'token',
          {
            expiresIn: 60 * 60
          }
        );
    
        return token;
      }
    

}