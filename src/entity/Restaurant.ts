import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()

export class Restaurant {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    restoName: string

    @Column()

    restoVille: string


}