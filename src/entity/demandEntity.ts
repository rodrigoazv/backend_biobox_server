import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinTable } from 'typeorm';
import { Product } from './productEntity';
import { User } from './userEntity';

@Entity()
export class Demand{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    name: string;

    @ManyToMany(type => Product)
    @JoinTable()
    products: Product[];

    @ManyToOne(type=> User)
    user: User;
}