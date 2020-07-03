import {getManager, Repository} from 'typeorm';

import { emailList } from '../entity/emailListEntity';

export class EmailListService{
    emailRepository: Repository<emailList>;

    constructor(){
        this.emailRepository = getManager().getRepository(emailList);
    }

    instantiate(data: Object): emailList{
        return this.emailRepository.create(data);
    }
    async getAll(){
        return this.emailRepository.createQueryBuilder("emaillist")
            .getMany();
    }
    async insertOne(data: emailList): Promise<emailList>{
        const newEmail = this.emailRepository.create(data);
        const saveEmail = await this.emailRepository.save(newEmail);
        return saveEmail;
    }
}