import { getManager,  Repository } from 'typeorm';

import  { Product } from '../entity/productEntity';

export class ProductService{
    productRepository : Repository<Product>;

    constructor(){
        this.productRepository = getManager().getRepository(Product);
    }
    instantiate(data: Object): Product | undefined {
     return this.productRepository.create(data);
    }
    async getAll(){
        return await this.productRepository.find();
    }
    async getByCategory(category: string): Promise<Product>{
        return await this.productRepository.findOneOrFail(category);
    }
    async getById(id: string): Promise<Product>{
        return await this.productRepository.findOneOrFail({
            where: {
              id, 
            }, relations:["category", "subCategory", "element"]
          });;
    }
    async insertOneProduct(data: Product){
        console.log(data);
        const NewProduct = this.productRepository.create(data);
        return await this.productRepository.save(NewProduct);
    }
    async deletProduct(id: string){
        return await this.productRepository.delete(id);
    }
}