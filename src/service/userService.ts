import { getManager, Repository } from "typeorm";

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
       return await this.userRepository.find();
   }


   async getByEmail(email: string ){     
     return await this.userRepository.findOneOrFail({
       where: {
         email
       }
     });
    
   }
   async getById(id: string){     
    return await this.userRepository.findOneOrFail({
      where: {
        id,
      }
    });
   
  }
   
   async insertOne(data: User){  
     console.log("Create a new user", data);
     const newUser = this.userRepository.create(data);
     return await this.userRepository.save(newUser);   
 
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