import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id!: number

    @Column("text")
    firstName!: string

    @Column("text")
    secondName!: string

    @Column("text")
    email!: string

    @Column("timestamp without time zone")
    accountCreated!: Date

}