import bcrypt from 'bcrypt';
import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert, Unique } from 'typeorm';

@Entity()
export class User{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    completName: string;

    @Column({
      unique: true,
    })
    email: string;

    @Column({ nullable: true })
    cpf: string;

    @Column({ nullable: true })
    dateNasc: Date;

    @Column({ nullable: true })
    number: string;

    @Column()
    password: string;
  
    @CreateDateColumn()
    createdDate: Date;
  
    @Column({ nullable: true })
    lastPresentLoggedDate: Date;
  
    @Column({ nullable: true })
    lastSuccessfulLoggedDate: Date;
  
    @Column({ nullable: true })
    lastFailedLoggedDate: Date;
  
    async setPassword(newPassword: string) {
      this.password = await bcrypt.hash(newPassword, 10);
    }
  
    @BeforeInsert()
    async encryptPassword() {
      this.password = await bcrypt.hash(this.password, 10);
    }

}