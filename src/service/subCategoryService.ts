import {getManager, Repository} from 'typeorm';

import { SubCategory } from '../entity/subCategoryEntity';


export class SubCategoryService{
    subCategoryRepository: Repository<SubCategory>;
    
    constructor(){
        this.subCategoryRepository = getManager().getRepository(SubCategory);
    }

    instantiate(data: Object): SubCategory | undefined {
        return this.subCategoryRepository.create(data);
    }
    async getAll(){
        return this.subCategoryRepository.find();
    }
    async getByName(name: string):Promise<SubCategory>{
        return this.subCategoryRepository.findOneOrFail({
            where:{
                name
            }
        })
        
    }
    async insertOne(data: SubCategory){
        const NewSubCategory = this.subCategoryRepository.create(data);
        return await this.subCategoryRepository.save(NewSubCategory);
    }

}