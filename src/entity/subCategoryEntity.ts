import {Entity, Column, PrimaryGeneratedColumn,  ManyToOne , OneToMany} from 'typeorm';
import {Category} from "./categoryEntity";
import {Product} from "./productEntity";

@Entity()
export class SubCategory{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        nullable: false,
    })
    name: string

    @OneToMany(type => Product, product => product.subCategory)
    products: Product[];

    @ManyToOne(type => Category, category => category.subCategorys)
    category: Category;
}