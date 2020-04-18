
import { Request, Response, Router } from 'express';
import { getManager } from 'typeorm';
//import service
import { AdressService } from '../service/adressService';
//import user entity

import { Adress } from '../entity/adressEntity';



class adressController{
    public async storeAdress(req: Request, res: Response){
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
}

export default new adressController();