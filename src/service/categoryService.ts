import {getManager, Repository} from 'typeorm';

import { Category } from '../entity/categoryEntity';
import { Product } from '../entity/productEntity';

export class CategoryService{
    categoryRepository: Repository<Category>;
    
    constructor(){
        this.categoryRepository = getManager().getRepository(Category);
    }

    instantiate(data: Object): Category | undefined {
        return this.categoryRepository.create(data);
    }
    async getAll(){
        return this.categoryRepository.createQueryBuilder("category")
        .leftJoinAndSelect("category.product", "product")
        .getMany();
    }
    async getByName(name: string):Promise<Category | any> {
        return await this.categoryRepository.createQueryBuilder("category")
            .where("category.name = :name", { name: name})
            .getOne();
    }
    async updateProduct(categoryWithProduct: Category){ 
        try{
            const updateUser = await this.categoryRepository.createQueryBuilder()
            .relation(Product, "category")
            .of(Category)
            .add(categoryWithProduct.product);
        return updateUser;
          
        }catch(err){
            return err
        }
    }
    async removeProduct(categoryWithProduct: Category){ 
        try{
            const updateUser = await this.categoryRepository.createQueryBuilder()
            .relation(Product, "product")
            .of(Category)
            .remove(categoryWithProduct.product);
        return updateUser;
          
        }catch(err){
            return err
        }
    }
    async insertOne(data: Category){
        const NewCategory = this.categoryRepository.create(data);
        return await this.categoryRepository.save(NewCategory);
    }

}