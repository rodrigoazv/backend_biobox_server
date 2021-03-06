import { Request, Response } from 'express';
import { getManager } from 'typeorm';
//import service
import { ProductService } from '../service/productService';
import { CategoryService } from '../service/categoryService';
//import user entity
import { Category } from '../entity/categoryEntity';
import { Product } from '../entity/productEntity';
import aws from "aws-sdk";
import { SubCategory } from '../entity/subCategoryEntity';
import { SubCategoryService } from '../service/subCategoryService';
import { productTecElements } from '../entity/productTecElementsEntity';
import { ProductTecElementsService } from '../service/productElementService';



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
            try{
                s3.deleteObject({
                    Bucket: 'biocateste',
                    Key: product.photoName
                })
            }catch{
                res.status(400).json({
                    status: false,
                    message:'Não foi possivel excluir foto do bucket'
                })
            }
            
            await productService.deletProduct(req.params.id);

            res.status(200).json({
                status:true,
                message: 'EveryThing OK'
            })
        }catch(err){
            console.log(err)
            res.status(400).json({
                status: false,
                message: "Não foi possivel excluir o produto"
            })
        }
    }
    public async updateQuantity(req: Request, res: Response){
        try{
            const productService = new ProductService();
            const product: Product = await productService.getById(req.body.id);
            product.stock = req.body.stock;
            
            await productService.updateStock(product);

            res.status(200).json({
                status:true,
                message: 'EveryThing OK'
            })
        }catch(err){
            console.log(err)
            res.status(400).json({
                status: false,
                message: "Não foi possivel excluir o produto"
            })
        }
    }

    public async store(req: Request , res: Response){

        const documentFile  = (req as File).file;
        try{
            const categoryService = new CategoryService();
            const subCategoryService = new SubCategoryService();
            const productTecElementsService = new ProductTecElementsService();
            let categoryStore: Category = await categoryService.getByName(req.body.category);
            let subCategoryStore: SubCategory = await subCategoryService.getByName(req.body.subcategory)
            
            //Requisição na tabela productElement Caracteristias para fazer o map e setar todas as caracteristicas dos produtos
            let dadosProduct: productTecElements[] = await Promise.all(req.body.tecElement.map(async (data: string)=> {
                let productTec = await productTecElementsService.getByName(data)
                return productTec;
                
            }))
            
            let productNew = new Product();
            productNew.productName = req.body.productName;
            productNew.productDescription = req.body.productDescription;
            productNew.productTecDescription = req.body.productTecDescription;
            productNew.productVol = req.body.productVol;
            productNew.productPrice = req.body.productPrice;
            productNew.photoUrl =  documentFile.location;
            productNew.photoName = documentFile.key;
            productNew.category = categoryStore;
            productNew.stock = req.body.stock;
            productNew.howToStock = req.body.howToStock;
            productNew.subCategory = subCategoryStore;
            productNew.element = dadosProduct;
            productNew.brand = req.body.brand;

            const productService = new ProductService();
            productNew = await productService.insertOneProduct(productNew);
 

            categoryStore.product = [productNew];
            await categoryService.updateProduct(categoryStore);

            res.status(200).json({
                message: "Produto cadastrado",
                status:true
            })
        }catch(error){
            console.log(error)
            res.status(400).json({
                message: "Não foi possivel cadastrar o produto",
                status:false
            })
        }
        
            //Requisição na tabela do banco para criar relação entre o produto e suas (Categorias e SubCategorias)
            
        
    }
}

export default new productController()