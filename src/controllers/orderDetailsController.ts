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
import { AdressService } from '../service/adressService';



class orderDetailController{
    public async sendOrderNoAdress(req: Request, res: Response){
       
        try{
            let orderDetailNew = new orderDetail();
            let demandNew = new Demand();
            
            const orderDetailService = new OrderDetailService();
            const productService = new ProductService();
            const userService = new UserService();
            const demandService = new DemandService();
            
            const userId = await userService.getById(req.userId);
                    
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
    public async sendOrder(req: Request, res: Response){
       
        try{
            let orderDetailNew = new orderDetail();
            let demandNew = new Demand();
            
            let adress = new Adress();
            const orderDetailService = new OrderDetailService();
            const productService = new ProductService();
            const userService = new UserService();
            const demandService = new DemandService();
            const adressService = new AdressService();
            
            const userId = await userService.getById(req.userId);
            console.log('reqbody----------',req.body)
            
            adress.zipcode = req.body.adress.zipcode;
            adress.city = req.body.adress.city;
            adress.state = req.body.adress.state;
            adress.street = req.body.adress.street;
            adress.number = req.body.adress.number;
            adress.complement = req.body.adress.complement;
            adress.neighborhood = req.body.adress.neighborhood;
            adress.user = userId;
            const adressFull = await adressService.insertOne(adress);
            userId.adress = adressFull
            const userFull = await userService.updateOneComplet(userId);
            console.log(userFull)
            
            const dados: orderDetail[] = await Promise.all(req.body.products.map(async (data: any)=> {
                orderDetailNew.produtoId = await productService.getById(data.pid)
                orderDetailNew.price = data.price;
                orderDetailNew.quantity = data.quantity;
                orderDetailNew = await orderDetailService.insertOne(orderDetailNew);
                return orderDetailNew;
                
            }))
            demandNew.orders = dados;
            demandNew.user = userFull;

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