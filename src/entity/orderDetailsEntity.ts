import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn} from 'typeorm';
import {Product} from './productEntity';
@Entity()
export class orderDetail{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => Product, product => product.orderDetails)
    produtoId: Product;

    @Column({ nullable: false})
    quantity: number;

    @Column({nullable: false})
    productName: string;

    @Column({nullable: false})
    productDescription: string;

    @Column({ 
        nullable: false, 
        type: "float"
    })
    price: number;

    @CreateDateColumn()
    createdDate: Date;

    

}