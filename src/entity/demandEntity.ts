import {Entity, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinTable,CreateDateColumn } from 'typeorm';
import { orderDetail } from './orderDetailsEntity';
import { UserBio } from './userEntity';

@Entity()
export class Demand{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    createdDate: Date;

    @ManyToMany(type => orderDetail)
    @JoinTable()
    orders: orderDetail[];

    @ManyToOne(type=> UserBio)
    user: UserBio;
}