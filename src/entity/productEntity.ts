import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, ManyToOne, JoinTable} from 'typeorm';
import {orderDetail} from './orderDetailsEntity';
import { productTecElements } from './productTecElementsEntity';
import { Category } from './categoryEntity';
import { SubCategory } from './subCategoryEntity';
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
        nullable: false,
        type: "float"
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
    brand: string;

    @Column({
        nullable: false
    })
    howToStock: string;

    @Column({
        nullable: false
    })
    stock: number;

    @Column({
        nullable: true
    })
    sellQuantity: number;

    @ManyToOne(type => Category, category => category.product)
    category: Category;

    @ManyToOne(type => SubCategory, subCategory => subCategory.products)
    subCategory: SubCategory;

    @OneToMany(type => orderDetail, orderDetail => orderDetail.product)
    orderDetails: orderDetail[];

    @ManyToMany(type => productTecElements)
    @JoinTable()
    element: productTecElements[];
}