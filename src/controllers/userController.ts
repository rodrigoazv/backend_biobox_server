import { Request, Response, Router } from 'express';
import { getManager } from 'typeorm';
//import service
import { UserService } from '../service/userService';
//import user entity
import { User } from '../entity/userEntity';
import { Adress } from '../entity/adressEntity';
import { AdressService } from '../service/adressService';


class userController {
    /* @GET alluser */
    public async index(req: Request, res: Response){
        try{
            const userService = new UserService();
            const user: User[] = await userService.getAll();
            return res.json(user);
        }catch(err){
            res.json(err);
        } 
    }

    public async storeAdressAndUser(req: Request, res:Response){
        
        try{
            const userService = new UserService();
            const adressService = new AdressService();
            const user: User = await userService.getById(req.userId);
            
            const adress = new Adress();
            adress.zipcode = req.body.zipcode;
            adress.city = req.body.city;
            adress.state = req.body.state;
            adress.street = req.body.street;
            adress.number = req.body.number;
            adress.complement = req.body.complement;
            adress.neighborhood = req.body.neighborhood;
            const adressFull = await adressService.insertOne(adress);
            user.adress = adressFull;
            const userAndAdressFull = await userService.updateOne(user);
            res.json({
                userAndAdressFull
            })
        }catch(err){
            res.json(err)
        }    

    }

    public async getUserEmail(req: Request, res: Response){
        try{
            const userService = new UserService();
            console.log(req.params.id);
            const user: User = await userService.getByIdClean(req.params.id);
            res.json({
                user
            }) 
        }catch(err){
            err
        }
    }

}

export default new userController;