import { Request, Response } from 'express';
import { getManager } from 'typeorm';
//import service
import { ProductService } from '../service/productService';
//import user entity
import { Product } from '../entity/productEntity';

class productController {
    public async index(req: Request, res: Response): Promise<Response>{
        const userService = new ProductService();
        const user: Product[] = await userService.getAll();
        return res.json(user);

    }

    public async store(req: Request , res: Response){
        try{
            let productNew = new Product();
            productNew.productName = req.body.productName;
            productNew.productDescription = req.body.productDescription;
            productNew.productTecDescription = req.body.productDescription;
            productNew.productVol = req.body.productVol;
            productNew.productPrice = req.body.productPrice;
            productNew.photoUrl = req.file.location;
            productNew.photoName = req.file.key;
            productNew.category = req.body.category;
            productNew.stock = req.body.stock;

            const productService = new ProductService();
            const productRepository  = getManager().getRepository(Product);
            productNew = productRepository.create(productNew);
            productNew = await productService.insertOneProduct(productNew);
            res.json({
                message: "Produto cadastrado",
            })
        }catch{
            res.json({
                message: "Erro ao tentar criar produto"
            })
        }
    }
}

export default new productController()