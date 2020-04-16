import { Request, Response, Router } from 'express';
import { getManager } from 'typeorm';
//import service
import { ProductService } from '../service/productService';
//import user entity
import { Product } from '../entity/productEntity';


const registerRoutes: Router = Router();
/*
 * Checks whether the login already exists
 *
 * @Method GET
 * @URL /api/users/
 *
*/
registerRoutes
    .route('/register')
    .post(
        async(req: Request, res: Response) =>{
            try{
                let productNew = new Product();
                productNew.productName = req.body.productName;

                const productService = new ProductService();
                res.json({
                    message: "Produto cadastrado",
                })
            }catch{
                res.json({
                    message: "Erro ao tentar criar produto"
                })
            }

            }
    )

export default registerRoutes;