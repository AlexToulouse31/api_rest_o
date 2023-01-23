import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Menu {
    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 100})
    menuName: string

    @Column({length: 10})
    price: number

}   
