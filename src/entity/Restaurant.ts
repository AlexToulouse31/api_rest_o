import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()

export class Restaurant {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 100 })
    restoName: string

    @Column({ length: 50 })

    restoVille: string


}