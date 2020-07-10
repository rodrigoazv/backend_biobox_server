import {getManager, Repository} from 'typeorm';

import { Category } from '../entity/categoryEntity';


export class CategoryService{
    categoryRepository: Repository<Category>;
    
    constructor(){
        this.categoryRepository = getManager().getRepository(Category);
    }

    instantiate(data: Object): Category | undefined {
        return this.categoryRepository.create(data);
    }
    async getAll(){
        return this.categoryRepository.find();
    }
    async getByName(name: string):Promise<Category | any> {
        return await this.categoryRepository.createQueryBuilder("category")
            .where("category.name = :name", { name: name})
            .getOne();
    }
    async insertOne(data: Category){
        const NewCategory = this.categoryRepository.create(data);
        return await this.categoryRepository.save(NewCategory);
    }

}