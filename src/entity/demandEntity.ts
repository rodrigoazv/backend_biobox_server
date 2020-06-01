import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinTable } from 'typeorm';
import { orderDetail } from './orderDetailsEntity';
import { User } from './userEntity';

@Entity()
export class Demand{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    name: string;

    @ManyToMany(type => orderDetail)
    @JoinTable()
    orders: orderDetail[];

    @ManyToOne(type=> User)
    user: User;
}