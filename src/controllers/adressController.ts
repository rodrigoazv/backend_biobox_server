
import { Request, Response, Router } from 'express';
import { getManager } from 'typeorm';
//import service
import { AdressService } from '../service/adressService';
//import user entity

import { Adress } from '../entity/adressEntity';


const adressRoutes: Router = Router();
/*
 * Checks whether the login already exists
 *
 * @Method GET
 * @URL /api/users/
 *
*/
adressRoutes
    .route('/adress')
    .post(
    async (req: Request, res:Response) =>{
        try{
            let adressNew = new Adress();
            adressNew.zipcode = req.body.zipcode;
            adressNew.street = req.body.street;
            adressNew.number = req.body.number;
            adressNew.neighborhood = req.body.neighborhood;
            adressNew.complement = req.body.complement;

            const adressService = new AdressService();
            const adressRepository = getManager().getRepository(Adress);
            adressNew = adressRepository.create(adressNew);
            adressNew = await adressService.insertOne(adressNew);
            res.json({
                message:"Endereço cadastrado",
            })
        }catch{
                res.json({
                    message:"erro",
                })
        }
    }
)

export default adressRoutes;