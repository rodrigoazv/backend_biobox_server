import { Request, Response, Router } from 'express';
import { getManager } from 'typeorm';
//import service
import { AdressService } from '../service/adressService';
//import user entity

import { AuthHandler } from '../midlleware/authHandle';

const authHandle = new AuthHandler();

class demandController{
    public async registerUserAdress(req: Request, res: Response){
        /*const adress = new Adress();
        adress.zipcode = req.body.zipcode;
        adress.city = req.body.zipcode;
        adress.state = req.body.state;
        adress.street = req.body.street;
        adress.number = req.body.number;
        adress.complement = req.body.complement;
        adress.neighborhood = req.body.neighborhood;*/


        

    }
}

export default new demandController();