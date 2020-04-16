import { Request, Response, Router } from 'express';
import { getManager } from 'typeorm';
//import service
import { UserService } from '../service/userService';
//import user entity
import { User } from '../entity/userEntity';


const userRoutes: Router = Router();
/*
 * Checks whether the login already exists
 *
 * @Method GET
 * @URL /api/users/
 *
*/
userRoutes
    .route('/')
    .get(
        async(req: Request, res: Response) =>{
            const userService = new UserService();
            const user: User[] = await userService.getAll();
            return res.json(user);
        }
    )

export default userRoutes;