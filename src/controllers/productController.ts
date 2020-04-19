import { Request, Response } from 'express';
import { getManager } from 'typeorm';
//import service
import { ProductService } from '../service/productService';
//import user entity
import { Product } from '../entity/productEntity';

interface File extends Request{
    file:any,    
}
class productController {
    public async index(req: Request, res: Response): Promise<Response>{
        const userService = new ProductService();
        const user: Product[] = await userService.getAll();
        return res.json(user);

    }

    public async store(req: Request , res: Response){

        const documentFile  = (req as File).file;
        
        try{
            let productNew = new Product();
            productNew.productName = req.body.productName;
            productNew.productDescription = req.body.productDescription;
            productNew.productTecDescription = req.body.productDescription;
            productNew.productVol = req.body.productVol;
            productNew.productPrice = req.body.productPrice;
            productNew.photoUrl =  documentFile.location;
            productNew.photoName = documentFile.key;
            productNew.category = req.body.category;
            productNew.stock = req.body.stock;

            const productService = new ProductService();
            const productRepository  = getManager().getRepository(Product);
            productNew = productRepository.create(productNew);
            productNew = await productService.insertOneProduct(productNew);
            res.send(200).json({
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