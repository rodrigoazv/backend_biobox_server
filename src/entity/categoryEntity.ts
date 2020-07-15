import {Entity, Column, PrimaryGeneratedColumn,  BeforeInsert,  BeforeUpdate, OneToMany } from 'typeorm';
import { SubCategory } from './subCategoryEntity';
import { Product } from './productEntity';

@Entity()
export class Category{
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

    @OneToMany(type => Product, product => product.category)
    product: Product[];

    @OneToMany(type => SubCategory, subCategory => subCategory.category)
    subCategorys: SubCategory[];
}