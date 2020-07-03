import { Request, Response} from 'express';
//import service
//import adress entity
import { UserBio } from '../entity/userEntity';
import { UserService} from '../service/userService';
import { DemandService } from '../service/demandService';
import { Demand } from '../entity/demandEntity';
import { Product } from '../entity/productEntity';


class demandController{
    public async index(req: Request, res: Response){
        try{
            const demandService = new DemandService();
            const demand: Demand[] = await demandService.getAll();
            return res.status(200).json(demand);
        }catch(err){
            res.status(404).json(err);
        } 
    }
    public async registerUserAdress(req: Request, res: Response){
        try{
            const userService = new UserService();
            const userId = await userService.getById(req.userId);
            if(!userId) return res.json({
                err: "Usúario não encontrado"
            })
            return res.json(userId)
    }   catch(erro){
        res.json({erro})
    }
        
    }
    
}

export default new demandController();