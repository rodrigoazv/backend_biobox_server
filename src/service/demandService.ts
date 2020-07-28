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
            .leftJoinAndSelect("demand.user", "user")
            .leftJoinAndSelect("demand.orders", "orders")
            .getMany();
    }
    async getById(id: string){
        return this.demandRepository.findOneOrFail({
            where: {
              id, 
            }, relations:["orders"]
          });
    }
    async insertOne(data: Demand): Promise<Demand>{  
        const newDemand = this.demandRepository.create(data);
        const saveDemand = await this.demandRepository.save(newDemand);
        return saveDemand;   
    }
    

}