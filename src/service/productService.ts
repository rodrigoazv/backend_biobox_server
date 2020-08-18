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
    async updateProductImage(product: Product){
        try {
            const updateUser = await this.productRepository.createQueryBuilder("product")
              .update(Product)
              .set({
                photoName: product.photoName,
                photoUrl: product.photoUrl
              })
              .where("id = :id", { id: product.id })
              .execute()
            return updateUser;
          }catch (error){
            return error
          }
    }
    async updateProduct(product: Product){
      console.log(product)
      try {
          const updateUser = await this.productRepository.createQueryBuilder("product")
            .update(Product)
            .set({sellQuantity: product.sellQuantity})
            .where("id = :id", { id: product.id })
            .execute()
          return updateUser;
        }catch (error){
          return error
        }
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