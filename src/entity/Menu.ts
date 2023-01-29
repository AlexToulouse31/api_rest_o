import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"


@Entity()
export class Menu extends BaseEntity {

    @PrimaryGeneratedColumn()
    menuId: number

    @Column('varchar')
    menuName: string

    @Column({ type: 'numeric' })
    price: number


}   
