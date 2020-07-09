import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import { Product } from './productEntity';
import { ManyToOne } from 'typeorm';

@Entity()
export class productTecElements{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        nullable: false,
    })
    name: string

    @Column({
        nullable: false,
    })
    description: string

    @ManyToOne(type => Product, product => product.element)
    product: Product;
}