import {getManager, Repository} from 'typeorm';

import { AdminBio } from '../entity/adminEntity';


export class AdminService{
    AdminRepository: Repository<AdminBio>;
    
    constructor(){
        this.AdminRepository = getManager().getRepository(AdminBio);
    }

    instantiate(data: Object): AdminBio | undefined {
        return this.AdminRepository.create(data);
    }
    async getAll(){
        return this.AdminRepository.find();
    }
    async getByEmail(email: string):Promise<AdminBio | any>{
        try{ 
            const user = this.AdminRepository.createQueryBuilder("admin_bio")
              .where("admin_bio.email = :email", { email: email })
              .getOne();
            return user;
          }catch(err){
            err
          }
    }
    async insertOne(data: AdminBio){
        const NewAdmin = this.AdminRepository.create(data);
        return await this.AdminRepository.save(NewAdmin);
    }

}