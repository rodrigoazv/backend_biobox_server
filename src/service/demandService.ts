import {getManager, Repository} from 'typeorm';

import { Demand } from '../entity/demandEntity';


export class DemandService{
    demandRepository: Repository<Demand>;
    
    constructor(){
        this.demandRepository = getManager().getRepository(Demand);
    }

    instantiate(data: Object): Demand {
        return this.demandRepository.create(data);
    }
    async getAll(){
        return this.demandRepository.createQueryBuilder("demand")
            .leftJoinAndSelect("demand.products", "product")
            .getMany();
    }
    async getById(id: string){
        return this.demandRepository.findOneOrFail(id);
    }
    async insertOne(data: Demand): Promise<Demand>{
        try{
            console.log('Dados de envio', data);
            const newDemand = this.demandRepository.create(data);
            return await this.demandRepository.save(newDemand);  
        } catch (error){
            return error
        }
    }
    

}