
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, JoinColumn, BaseEntity } from "typeorm"
import { Commande } from "./Commande"
import { UsersService } from "../services/UsersService"
import { type } from "os"
import { Menu } from "./Menu"
@Entity()
export class Users extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "varchar", select: false })
  userName: string

  @Column()
  password: string
  @Column({ type: 'boolean', default: false })
  admin: boolean


}