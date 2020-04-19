import { Request, Response, Router } from 'express';
import { getManager } from 'typeorm';
//import service
import { AdressService } from '../service/adressService';
//import adress entity
import { Adress } from '../entity/adressEntity';
import { User } from '../entity/userEntity';
import { UserService} from '../service/userService';


class demandController{
    public async registerUserAdress(req: Request, res: Response){
        const userService = new UserService();
        /*const adress = new Adress();
        adress.zipcode = req.body.zipcode;
        adress.city = req.body.zipcode;
        adress.state = req.body.state;
        adress.street = req.body.street;
        adress.number = req.body.number;
        adress.complement = req.body.complement;
        adress.neighborhood = req.body.neighborhood;*/
        const userId = await userService.getById(req.userId);
        if(!userId) return res.json({
            err: "sem user"
        })
        res.send(userId);

        

    }
}

export default new demandController();