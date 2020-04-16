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
   
   async insertOne(data: User){  
     console.log("Create a new user", data);
     const newUser = this.userRepository.create(data);
     return await this.userRepository.save(newUser);   
 
   }


}