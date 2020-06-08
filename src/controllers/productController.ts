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
    public async index(req: Request, res: Response): Promise<Response | undefined>{
        try{
            const userService = new ProductService();
            const user: Product[] = await userService.getAll();
            return res.json(user);
        }catch{
            res.json({message:"Ops, sem permissão para retornar todos os usuarios"})
        }
    }
    public async indexId(req: Request, res: Response): Promise<Response | undefined>{
        try{
            console.log(req.params.id);
            const userService = new ProductService();
            const user: Product = await userService.getById(req.params.id);
            return res.json(user);
        }catch{
            res.json({message:"Ops, sem permissão para retornar produto"})
        }
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
            res.status(200).json({
                message: "Produto cadastrado",
            })
        }catch(err){
            res.status(400).json({
                message: "Erro ao tentar criar produto",
                err: err
            })
        }
    }
}

export default new productController()