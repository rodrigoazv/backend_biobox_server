import {getManager, Repository} from 'typeorm';

import { Demand } from '../entity/demandEntity';


export class DemandService{
    demandRepository: Repository<Demand>;
    
    constructor(){
        this.demandRepository = getManager().getRepository(Demand);
    }

    instantiate(data: Object): Demand | undefined {
        return this.demandRepository.create(data);
    }
    async getAll(){
        return this.demandRepository.find();
    }
    async getById(id: string){
        return this.demandRepository.findOneOrFail(id);
    }
    async insertOne(data: Demand){
        const NewAdress = this.demandRepository.create(data);
        return await this.demandRepository.save(NewAdress);
    }

}