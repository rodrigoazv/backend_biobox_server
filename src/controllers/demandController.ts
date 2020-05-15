import { Request, Response, Router } from 'express';
//import service
//import adress entity
import { User } from '../entity/userEntity';
import { UserService} from '../service/userService';
import { DemandService } from '../service/demandService';
import { Demand } from '../entity/demandEntity';
import { Product } from '../entity/productEntity';
import { ProductService } from '../service/productService';



class demandController{
    public async index(req: Request, res: Response){
        try{
            const demandService = new DemandService();
            const demand: Demand[] = await demandService.getAll();
            return res.json(demand);
        }catch(err){
            res.json(err);
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
    public async sendOrder(req: Request, res: Response){
       
       try{ 
            let demandNew = new Demand();
            const userService = new UserService();
            const demandService = new DemandService();

            const userId: User = await userService.getById(req.body.userId);
            
            console.log(req.body.products)

            const productsListFromCart: Product[] = req.body.products.map((data: Product )=> {
                return data 
            })

            demandNew.products = productsListFromCart;
            demandNew.user = userId;

            demandNew = await demandService.insertOne(demandNew);

            res.status(200).json({
                demandNew
            })
       } 
       catch{
            res.status(404).json({
                message:'deuruim'
            })
       }

    }
    
}

export default new demandController();