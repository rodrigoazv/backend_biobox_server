import { Request, Response, Router } from 'express';
import { getManager } from 'typeorm';
//import service
import { UserService } from '../service/userService';
//import user entity
import { User } from '../entity/userEntity';


class registerController {
    public async storeUser(req: Request, res: Response){
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

}

export default new registerController();