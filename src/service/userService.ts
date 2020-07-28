import { getManager, Repository, getConnection } from "typeorm";

import { UserBio } from "../entity/userEntity";

export class UserService {
   userRepository: Repository<UserBio>;

   constructor(){
       this.userRepository = getManager().getRepository(UserBio);
   }

     /**
  * Returns array of all users from db
  */
   instantiate(data: Object): UserBio | undefined {
     return this.userRepository.create(data);
   }
   async getAll() {
       return await this.userRepository.find({ relations: ["adress"] });
   }


   async getByEmail(email: string ):Promise<UserBio | any>{     
    
    try{ 
      const user = this.userRepository.createQueryBuilder("user_bio")
        .where("user_bio.email = :email", { email: email })
        .addSelect("user_bio.password")
        .addSelect("user_bio.passTokenRecovery")
        .getOne();
      return user;

    }catch(err){
      err
    }
   }
   async getByEmailWithoutPass(email: string ):Promise<UserBio>{     
    
    return await this.userRepository.findOneOrFail({
      where: {
        email, 
      }, relations:["adress"]
    });
   }
   async getById(id: string): Promise<UserBio| any>{     
    try{
      const user = await this.userRepository.createQueryBuilder("user_bio")
        .where("user_bio.id = :id", { id: id })
        .addSelect("user_bio.password")
        .getOne();
      return user;
    } catch (err){
      return err
    }
}
  async getByIdClean(id: string){     
    return await this.userRepository.findOneOrFail({
      where: {
        id, 
      }, relations:["adress", "demands"]
    });
  }
  async getByIdRecovery(id: string):Promise<UserBio | any>{  
    try{
      const user = await this.userRepository.createQueryBuilder("user_bio")
        .where("user_bio.id = :id", { id: id })
        .addSelect("user_bio.passTokenRecovery")
        .getOne();
      return user;
    } catch(err){
      err
    }
    
  }
   
   async insertOne(data: UserBio){  
     console.log("Create a new user", data);
     const newUser = this.userRepository.create(data);
     return await this.userRepository.save(newUser);   
 
   }
   async updateOneComplet(data:UserBio): Promise<UserBio>{
    try {
      const updateUser = await this.userRepository.save(data);
      return updateUser;
    }catch (error){
      return error
    }
 }

   async updateOnePass(data:UserBio): Promise<UserBio | any>{
      try {
        const updateUser = await this.userRepository.createQueryBuilder("user_bio")
          .update(UserBio)
          .set({password: data.password})
          .where("id = :id", { id: data.id })
          .execute()
        return updateUser;
      }catch (error){
        return error
      }
   }
   
   
   async setLastPresentLoggedDate(user: UserBio){
    const userId: UserBio = this.userRepository.getId(user);

    try {
      return await this.userRepository.update(userId, {
        lastPresentLoggedDate: new Date()
      });
    } catch (error) {
      return Promise.reject(error);
    }
   }


}