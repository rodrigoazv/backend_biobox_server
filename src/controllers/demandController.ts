import { Request, Response} from 'express';
//import service
//import adress entity
import { UserService} from '../service/userService';
import { DemandService } from '../service/demandService';
import { Demand } from '../entity/demandEntity';


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
    public async indexByid(req: Request, res: Response){
        try{
            const demandService = new DemandService();
            const userId = await demandService.getById(req.params.id);
            return res.json(userId)
    }   catch(erro){
        res.json({
            error: erro, 
            status: false,
            message: "Não foi possivel encontrar esse pedido"
        })
    }
        
    }
    
}

export default new demandController();