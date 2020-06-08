import { Request, Response, Router } from 'express';
import { getManager } from 'typeorm';
//import service
import { UserService } from '../service/userService';
//import user entity
import { UserBio } from '../entity/userEntity';


class registerController {
    public async storeUser(req: Request, res: Response){
        try{
            let userNew = new UserBio();
            userNew.completName = req.body.completName;
            userNew.email = req.body.email;
            userNew.password = req.body.password;
            userNew.cpf = req.body.cpf;
            userNew.number = req.body.number;
            userNew.dateNasc = req.body.dateNasc;
            userNew.Sexo = req.body.sexo;
            const userRepository = getManager().getRepository(UserBio);
            const userService = new UserService();
            userNew = userRepository.create(userNew);
            userNew = await userService.insertOne(userNew);

            res.status(200).json({
                message: "Usúario criado com sucesso",
            })
        }catch{
            res.status(400).json({
                message: "Erro ao tentar criar usúario, email já existe",
            })
        }

    }

}

export default new registerController();