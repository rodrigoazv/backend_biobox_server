import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express'

import { User } from "../entity/userEntity";
import * as dotenv from "dotenv";
dotenv.config();

export class AuthHandler {

    verifyToken (req: Request, res: Response){
      const pickToken = req.header('token');
      if(!pickToken) return console.log("deuruim")
      console.log(process.env.SECRET_KEY)
      const token = jwt.verify(pickToken, process.env.SECRET_KEY || 'token');
      return res.json({
        message: "pass"
      })
    }

    generateToken(user: User){
        const token = jwt.sign(
          {
            id: user.id
          },
          process.env.SECRET_KEY || 'token',
          {
            expiresIn: 1
          }
        );
    
        return token;
      }
    

}