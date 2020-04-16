import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert, Unique } from 'typeorm';

@Entity()
export class Adress{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    zipcode: string;

    @Column()
    street: string;

    @Column()
    number: string;

    @Column()
    neighborhood: string;

    @Column()
    complement: string;
  
    @CreateDateColumn()
    createdDate: Date;

}