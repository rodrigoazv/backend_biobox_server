import { Request, Response} from 'express';
import { getManager } from 'typeorm';
//services imports
import { CategoryService } from '../service/categoryService';
import { ProductTecElementsService } from '../service/productElementService';
import { SubCategoryService } from '../service/subCategoryService';
//entity imports
import { SubCategory } from '../entity/subCategoryEntity';
import { productTecElements} from '../entity/productTecElementsEntity';
import { Category } from '../entity/categoryEntity';

interface File extends Request{
    file:any,    
}
class categoryController{
    public async storeCategory(req: Request, res: Response){

        try{
            const categoryService = new CategoryService();
            let newCategory = new Category();

            newCategory.name = req.body.name;
            newCategory.description = req.body.description;

            await categoryService.insertOne(newCategory);

            res.status(200).json({
                message: "Categoria cadastrada",
                status: true
            })
        }
        catch{
            res.status(400).json({
                message: "Não foi possivel criar categoria ocorreu um erro",
                status: false
            })
        }
        
    }
    public async storeSubCategory(req: Request, res: Response){

        try{
            const subcategoryService = new SubCategoryService();
            let newSubCategory = new SubCategory();

            newSubCategory.name = req.body.name;

            await subcategoryService.insertOne(newSubCategory);

            res.status(200).json({
                message: "SubCategoria cadastrada",
                status: true
            })
        }
        catch{
            res.status(400).json({
                message: "Não foi possivel criar subCategoria ocorreu um erro",
                status: false
            })
        }
        
    }
    public async storeProductTecElement(req: Request, res: Response){

        const documentFile  = (req as File).file;

        try{
            const productElementService = new ProductTecElementsService();
            let newProductElements = new productTecElements();

            newProductElements.name = req.body.name;
            newProductElements.iconUrl = documentFile.location;

            await productElementService.insertOne(newProductElements);

            res.status(200).json({
                message: "Caracteristicas cadastradas",
                status: true
            })
        }
        catch{
            res.status(400).json({
                message: "Não foi possivel criar categoria ocorreu um erro",
                status: false
            })
        }
        
    }

    public async indexProductElements(req: Request, res: Response){
        try{
            const productElementService = new ProductTecElementsService();
            const TecElements: productTecElements[] = await productElementService.getAll();
            return res.json(TecElements);
        }catch(err){
            res.json(err);
        } 
    }

    public async indexCategory(req: Request, res: Response){
        try{
            const productElementService = new CategoryService();
            const Categorys: Category[] = await productElementService.getAll();
            return res.json(Categorys);
        }catch(err){
            res.json(err);
        } 
    }

    public async indexSubCategory(req: Request, res: Response){
        try{
            const productElementService = new SubCategoryService();
            const TecElements: SubCategory[] = await productElementService.getAll();
            return res.json(TecElements);
        }catch(err){
            res.json(err);
        } 
    }
}
export default new categoryController();