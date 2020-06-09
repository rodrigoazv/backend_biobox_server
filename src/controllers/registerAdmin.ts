import { Request, Response, Router } from 'express';
import { getManager } from 'typeorm';
//import service
import { AdminService } from '../service/adminService';
//import user entity
import { AdminBio } from '../entity/adminEntity';


class adminController {
    public async storeUser(req: Request, res: Response){
        try{
            let userNew = new AdminBio();
            userNew.email = req.body.email;
            userNew.password = req.body.password;
            const userRepository = getManager().getRepository(AdminBio);
            const userService = new AdminService();
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

export default new adminController();