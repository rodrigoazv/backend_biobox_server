import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import { Product } from './productEntity';
import { ManyToMany } from 'typeorm';

@Entity()
export class productTecElements{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        nullable: false,
    })
    name: string

    @Column({
        nullable: false
    })
    iconUrl: string;

    @ManyToMany(type => Product)
    product: Product[];
}