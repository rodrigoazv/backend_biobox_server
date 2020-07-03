import { Request, Response } from 'express';
import { getManager } from 'typeorm';
//import service
import { ProductService } from '../service/productService';
//import user entity
import { Product } from '../entity/productEntity';
import aws from "aws-sdk";

interface File extends Request{
    file:any,    
}
class productController {
    public async index(req: Request, res: Response): Promise<Response | undefined>{
        try{
            const productService = new ProductService();
            const product: Product[] = await productService.getAll();
            return res.json(product);
        }catch{
            res.json({message:"Ops, sem permissão para retornar todos os produtos"})
        }
    }
    public async indexId(req: Request, res: Response): Promise<Response | undefined>{
        try{
            const productService = new ProductService();
            const product: Product = await productService.getById(req.params.id);
            return res.json(product);
        }catch{
            res.json({message:"Ops, sem permissão para retornar produto"})
        }
    }
    public async indexIdBody(req: Request, res: Response): Promise<Response | undefined>{
        try{
            const productService = new ProductService();
            const product: Product = await productService.getById(req.body.id);
            return res.json(product);
        }catch{
            res.json({message:"Ops, sem permissão para retornar produto"})
        }
    }
    public async delete(req: Request, res: Response){
        try{
            const productService = new ProductService();
            const product: Product = await productService.getById(req.params.id);
            const s3 = new aws.S3();
            s3.deleteObject({
                Bucket: 'biocateste',
                Key: product.photoName
            }).promise()
            await productService.deletProduct(req.params.id);
            res.status(200).json({
                sucess:true,
                message: 'EveryThing OK'
            })
        }catch(err){
            res.status(400).json({
                sucess: false,
                message: "Não foi possivel excluir o produto"
            })
        }
    }

    public async store(req: Request , res: Response){

        const documentFile  = (req as File).file;
    
        try{
            let productNew = new Product();
            productNew.productName = req.body.productName;
            productNew.productDescription = req.body.productDescription;
            productNew.productTecDescription = req.body.productTecDescription;
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