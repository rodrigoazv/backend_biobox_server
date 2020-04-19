import jwt from "jsonwebtoken";

import { User } from "../entity/userEntity";

import config from "../config/config";

const { auth } = config;
export class AuthHandler {


    superSecret = auth.secretKey;


    generateToken(user: User): string {
        const token = jwt.sign(
          {
            id: user.id
          },
          this.superSecret,
          {
            expiresIn: "5d"
          }
        );
    
        return token;
      }
    

}