import { Request, Response, Router } from 'express';
import { getManager } from 'typeorm';
//import service
import { UserService } from '../service/userService';
//import user entity
import { User } from '../entity/userEntity';


const registerRoutes: Router = Router();
/*
 * Checks whether the login already exists
 *
 * @Method GET
 * @URL /api/users/
 *
*/
registerRoutes
    .route('/register')
    .post(
        async(req: Request, res: Response) =>{
            try{
                let userNew = new User();
                userNew.completName = req.body.completName;
                userNew.email = req.body.email;
                userNew.password = req.body.password;

                const userRepository = getManager().getRepository(User);
                const userService = new UserService();
                userNew = userRepository.create(userNew);
                userNew = await userService.insertOne(userNew);

                res.json({
                    message: "Usúario criado com sucesso",
                })
            }catch{
                res.json({
                    message: "Erro ao tentar criar usúario, email já existe"
                })
            }

            }
    )

export default registerRoutes;