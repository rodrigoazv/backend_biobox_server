import bcrypt from 'bcrypt';
import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert,  OneToOne, JoinColumn, BeforeUpdate, OneToMany } from 'typeorm';
import {Adress} from './adressEntity';
import { Demand } from './demandEntity';

@Entity()
export class UserBio{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
      nullable:false
    })
    completName: string;

    @Column({
      nullable:false
    })
    Sexo: string;

    @Column({
      unique: true,
    })
    email: string;

    @Column({
      unique:true,
      update:false,
      nullable:false
    })
    cpf: string;

    @Column({
      nullable:false
    })
    dateNasc: Date;

    @Column({
      unique:true,
      nullable:false
    })
    number: string;

    @Column({
      nullable:false,
      select:false
    })
    password: string;

    @Column({
      select:false,
      nullable:true,
    })
    passTokenRecovery:string;
  
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
    @BeforeUpdate()
    async encryptPassword() {
      this.password = await bcrypt.hash(this.password, 10);
    }

    @OneToOne(type => Adress, adress => adress.user, {
      cascade: true
    })
    @JoinColumn()
    adress: Adress;

    @OneToMany(type => Demand, demand => demand.user)
    demands: Demand[];

}