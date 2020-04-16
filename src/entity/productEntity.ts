import {Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    productName: string;

    @Column()
    productDescription: string;

    @Column()
    productTecDescription: string;

    @Column()
    productPrice: number;
    
    @Column()
    productVol: string;

    @Column()
    photoUrl: string;

    @Column()
    category: string;

    @Column()
    stock: number;

    @Column()
    quantityBuy: number | 0;


}