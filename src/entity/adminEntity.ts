import bcrypt from 'bcrypt';
import {Entity, Column, PrimaryGeneratedColumn,  BeforeInsert,  BeforeUpdate } from 'typeorm';
@Entity()
export class AdminBio{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
      unique: true,
    })
    email: string;

    @Column({
      nullable:false,
    })
    password: string;
    
    async setPassword(newPassword: string) {
      this.password = await bcrypt.hash(newPassword, 10);
    }
  
    @BeforeInsert()
    @BeforeUpdate()
    async encryptPassword() {
      this.password = await bcrypt.hash(this.password, 10);
    }
}