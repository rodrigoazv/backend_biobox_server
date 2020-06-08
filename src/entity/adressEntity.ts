import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne } from 'typeorm';
import { UserBio } from './userEntity';

@Entity()
export class Adress{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    zipcode: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    street: string;

    @Column()
    number: string;

    @Column()
    neighborhood: string;

    @Column()
    complement: string;
  
    @CreateDateColumn()
    createdDate: Date;

    @OneToOne(type => UserBio, user => user.adress)
    user: UserBio;

}