import {getManager, Repository} from 'typeorm';

import { orderDetail } from '../entity/orderDetailsEntity';


export class OrderDetailService{
    orderDetailRepository: Repository<orderDetail>;
    
    constructor(){
        this.orderDetailRepository = getManager().getRepository(orderDetail);
    }

    instantiate(data: Object): orderDetail {
        return this.orderDetailRepository.create(data);
    }
    async getAll(){
        return this.orderDetailRepository.createQueryBuilder("orderDetailService")
            .leftJoinAndSelect("demand.user", "user")
            .leftJoinAndSelect("demand.products", "product")
            .getMany();
    }
    async getById(id: string){
        return this.orderDetailRepository.findOneOrFail(id);
    }
    async insertOne(data: orderDetail): Promise<orderDetail>{
        try{
            console.log('Dados de envio', data);
            const neworderDetailService = this.orderDetailRepository.create(data);
            return await this.orderDetailRepository.save(neworderDetailService);  
        } catch (error){
            return error
        }
    }
    

}