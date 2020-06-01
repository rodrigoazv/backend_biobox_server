import { Request, Response, Router } from 'express';
//import service
//import adress entity
import { User } from '../entity/userEntity';
import { UserService} from '../service/userService';
import { OrderDetailService } from '../service/orderDetailService';
import { orderDetail } from '../entity/orderDetailsEntity';
import { Demand } from '../entity/demandEntity';
import { ProductService } from '../service/productService';
import { DemandService } from '../service/demandService';
import { Adress } from '../entity/adressEntity';



class orderDetailController{
    public async sendOrder(req: Request, res: Response){
       
        try{
            let orderDetailNew = new orderDetail();
            let demandNew = new Demand();
            let userNew = new User();
            let adressNew = new Adress();
            const orderDetailService = new OrderDetailService();
            const productService = new ProductService();
            const userService = new UserService();
            const demandService = new DemandService();


            
            
            const userId = await userService.getById(req.body.userId);
            console.log('reqbody----------')
            console.log('reqbody----------',req.body)
            adressNew.zipcode = req.body.adress.zipcode;
            adressNew.street = req.body.adress.street;
            adressNew.city = req.body.adress.city;
            adressNew.number = req.body.adress.number;
            adressNew.state = req.body.adress.state;
            adressNew.neighborhood = req.body.adress.neighborhood;
            
            userNew.adress = adressNew
            await userService.insertOne(userNew);
            
            const dados: orderDetail[] = await Promise.all(req.body.products.map(async (data: any)=> {
                orderDetailNew.produtoId = await productService.getById(data.pid)
                orderDetailNew.price = data.price;
                orderDetailNew.quantity = data.quantity;
                orderDetailNew = await orderDetailService.insertOne(orderDetailNew);
                return orderDetailNew;
                
            }))
            demandNew.orders = dados;
            demandNew.user = userId;

            await demandService.insertOne(demandNew);
            //demand.orders = [];
            res.status(201).json({
                message: "Enviado"
            })

        }catch{
            res.status(400).json({
                message: "Não foi possivel realizar seu pedido"
            })
        }
            
      

    }
    
}

export default new orderDetailController();