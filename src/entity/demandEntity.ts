import {Entity, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinTable,CreateDateColumn, Column } from 'typeorm';
import { orderDetail } from './orderDetailsEntity';
import { UserBio } from './userEntity';

@Entity()
export class Demand{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    createdDate: Date;

    @Column({ nullable: false , type: "float"})
    totalPrice: number;

    @Column({
        nullable: false,
        type: "float"
    })
    shipValue: number;

    @Column({ nullable: false})
    vaucher: string;

    @Column({ nullable: false})
    shipStatus: string;

    @Column()
    shipZipcode: string;

    @Column()
    shipCity: string;

    @Column()
    shipState: string;

    @Column()
    shipStreet: string;

    @Column()
    shipNumber: string;

    @Column()
    shipNeighborhood: string;

    @Column()
    shipComplement: string;

    @ManyToMany(type => orderDetail)
    @JoinTable()
    orders: orderDetail[];

    @ManyToOne(type=> UserBio)
    user: UserBio;
}