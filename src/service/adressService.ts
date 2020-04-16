import {getManager, Repository} from 'typeorm';

import { Adress } from '../entity/adressEntity';


export class AdressService{
    adressRepository: Repository<Adress>;
    
    constructor(){
        this.adressRepository = getManager().getRepository(Adress);
    }

    instantiate(data: Object): Adress | undefined {
        return this.adressRepository.create(data);
    }
    async getAll(){
        return this.adressRepository.find();
    }
    async insertOne(data: Adress){
        const NewAdress = this.adressRepository.create(data);
        return await this.adressRepository.save(NewAdress);
    }

}