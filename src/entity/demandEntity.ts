import {Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Demand{
    @PrimaryGeneratedColumn('uuid')
    id: string;

}