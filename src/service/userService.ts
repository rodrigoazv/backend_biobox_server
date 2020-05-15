import { getManager, Repository, getConnection } from "typeorm";

import { User } from "../entity/userEntity";

export class UserService {
   userRepository: Repository<User>;

   constructor(){
       this.userRepository = getManager().getRepository(User);
   }

     /**
  * Returns array of all users from db
  */
   instantiate(data: Object): User | undefined {
     return this.userRepository.create(data);
   }
   async getAll() {
       return await this.userRepository.find({ relations: ["adress"] });
   }


   async getByEmail(email: string ):Promise<User | any>{     
    
    try{ 
      const user = this.userRepository.createQueryBuilder("user")
        .where("user.email = :email", { email: email })
        .addSelect("user.password")
        .getOne();
      return user;

    }catch(err){
      err
    }
   }
   async getByEmailWithoutPass(email: string ):Promise<User>{     
    
    return await this.userRepository.findOneOrFail({
      where: {
        email, 
      }, relations:["adress"]
    });
   }
   async getById(id: string){     
    return await this.userRepository.findOneOrFail({
      where: {
        id, 
      }
    });
   
  }
  async getByIdClean(id: string){     
    return await this.userRepository.findOneOrFail({
      where: {
        id, 
      }, relations:["adress"]
    });
  }
   
   async insertOne(data: User){  
     console.log("Create a new user", data);
     const newUser = this.userRepository.create(data);
     return await this.userRepository.save(newUser);   
 
   }

   async updateOne(data:User): Promise<User>{
      try {
        const updateUser = await this.userRepository.save(data);
        return updateUser;
      }catch (error){
        return error
      }
   }
   
   
   async setLastPresentLoggedDate(user: User){
    const userId: User = this.userRepository.getId(user);

    try {
      return await this.userRepository.update(userId, {
        lastPresentLoggedDate: new Date()
      });
    } catch (error) {
      return Promise.reject(error);
    }
   }


}