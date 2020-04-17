import {Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        nullable: false
    })
    productName: string;

    @Column({
        nullable: false
    })
    productDescription: string;

    @Column({
        nullable: false
    })
    productTecDescription: string;

    @Column({
        nullable: false
    })
    productPrice: number;
    
    @Column({
        nullable: false
    })
    productVol: string;

    @Column({
        nullable: false
    })
    photoUrl: string;
    @Column({
        nullable: false
    })
    photoName: string;

    @Column({
        nullable: false
    })
    category: string;

    @Column({
        nullable: false
    })
    stock: number;

    @Column({nullable: true})
    quantityBuy: number | 0;


}