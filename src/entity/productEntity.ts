import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {orderDetail} from './orderDetailsEntity';
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

    @OneToMany(type => orderDetail, orderDetail => orderDetail.produtoId)
    orderDetails: orderDetail[];

}