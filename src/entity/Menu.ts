import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Menu {
    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 100})
    menuName: string

    @Column()
    price: number

}   
