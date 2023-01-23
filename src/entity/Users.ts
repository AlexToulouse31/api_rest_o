import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Users {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 100 })
    userName: string

    @Column({ length: 255 })
    password: string
}
