import {getManager, Repository} from 'typeorm';

import { productTecElements } from '../entity/productTecElementsEntity';


export class ProductTecElementsService{
    productTecElementsRepository: Repository<productTecElements>;
    
    constructor(){
        this.productTecElementsRepository = getManager().getRepository(productTecElements);
    }

    instantiate(data: Object): productTecElements | undefined {
        return this.productTecElementsRepository.create(data);
    }
    async getAll(){
        return this.productTecElementsRepository.find();
    }
    async getByName(name: string):Promise< productTecElements | any>{
        return this.productTecElementsRepository.findOneOrFail({
            where:{
                name
            }
        })
    }
    async insertOne(data: productTecElements){
        const NewproductTecElements = this.productTecElementsRepository.create(data);
        return await this.productTecElementsRepository.save(NewproductTecElements);
    }

}