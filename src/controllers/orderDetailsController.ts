import { Request, Response} from 'express';
//import service
//import adress entity
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
        const {zipcode, city, state, street, number, complement, neighborhood} = req.body.adressUser;
        try{
            let orderDetailNew = new orderDetail();
            let demandNew = new Demand();
            
            const orderDetailService = new OrderDetailService();
            const productService = new ProductService();
            const userService = new UserService();
            const demandService = new DemandService();
            
            const userId = await userService.getById(req.userId);
            //Inserindo endereço na tabela adress e criando relação com usuário
            if(req.body.totalPrice === 0) {
                return res.status(400).json({
                    message: "Error: seu valor de pedido tem que ser maior que 0",
                    status: false
                })
            }
            //Inserindo 
            const dados: orderDetail[] = await Promise.all(req.body.products.map(async (data: any)=> {
                //Atualiza o produto com a quantidade vendida dele 
                let productData = await productService.getById(data.pid)
                productData.sellQuantity += data.quantity;
                productData.stock -= data.quantity;
                await productService.updateProduct(productData);
                //insere o produto no orderDetails, fica os detalhes dos produtos na demanda
                orderDetailNew.product = productData;
                orderDetailNew.productId = data.pid;
                orderDetailNew.price = data.price;
                orderDetailNew.productName = data.name;
                orderDetailNew.productDescription = data.description;
                orderDetailNew.quantity = data.quantity;
                orderDetailNew.photoUrl = data.photo;
                let orderDetailNews = await orderDetailService.insertOne(orderDetailNew);
                return orderDetailNews;
                
            }))
            demandNew.orders = dados;
            demandNew.user = userId;
            demandNew.shipCity = city;
            demandNew.shipComplement = complement;
            demandNew.shipNeighborhood = neighborhood;
            demandNew.shipState = state;
            demandNew.shipStreet = street;
            demandNew.shipZipcode = zipcode;
            demandNew.shipNumber = number;
            demandNew.totalPrice = req.body.totalPrice;
            //MUDAR VALORES AQUI
            demandNew.shipValue = req.body.shipValue;
            demandNew.vaucher =req.body.vaucher;
            demandNew.shipStatus =req.body.shipStatus;
            

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
        const {zipcode, city, state, street, number, complement, neighborhood} = req.body.adress;
        
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
            //Inserindo endereço na tabela adress e criando relação com usuário
            adress.zipcode = zipcode;
            adress.city = city;
            adress.state = state;
            adress.street = street;
            adress.number = number;
            adress.complement = complement;
            adress.neighborhood = neighborhood;
            adress.user = userId;
            const adressFull = await adressService.insertOne(adress);
            userId.adress = adressFull
            //caso nao tenha produtos
            if(req.body.totalPrice === 0) {
                return res.status(400).json({
                    message: "Error: seu valor de pedido tem que ser maior que 0",
                    status: false
                })
            }
            //Inserindo 
            const dados: orderDetail[] = await Promise.all(req.body.products.map(async (data: any)=> {
                //Atualiza o produto com a quantidade vendida dele 
                let productData = await productService.getById(data.pid)
                productData.sellQuantity += data.quantity;
                productData.stock -= data.quantity;
                await productService.updateProduct(productData);
                //insere o produto no orderDetails, fica os detalhes dos produtos na demanda
                orderDetailNew.product = productData;
                orderDetailNew.productId = data.pid;
                orderDetailNew.price = data.price;
                orderDetailNew.productName = data.name;
                orderDetailNew.productDescription = data.description;
                orderDetailNew.quantity = data.quantity;
                orderDetailNew.photoUrl = data.photo;
                let orderDetailNews = await orderDetailService.insertOne(orderDetailNew);
                return orderDetailNews;
                
            }))
        
            demandNew.orders = dados;
            demandNew.user = userId;
            demandNew.shipCity = city;
            demandNew.shipComplement = complement;
            demandNew.shipNeighborhood = neighborhood;
            demandNew.shipState = state;
            demandNew.shipStreet = street;
            demandNew.shipZipcode = zipcode;
            demandNew.shipNumber = number;
            demandNew.totalPrice = req.body.totalPrice;
            demandNew.shipValue = req.body.shipValue;
            demandNew.vaucher =req.body.vaucher;
            demandNew.shipStatus =req.body.shipStatus;
            //Update userDemands
            userId.demands = demandNew;

            await demandService.insertOne(demandNew);
            await userService.updateOneComplet(userId);
            //demand.orders = [];
            res.status(201).json({
                message: "Enviado",
                status: true
            })
        }catch{
            res.status(400).json({
                message: "Não foi possivel enviar",
                status: false
            })
        }
        
            
      

    }
    
}

export default new orderDetailController();