
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, JoinColumn, BaseEntity } from "typeorm"
import { Commande } from "./Commande"
import { Restaurant } from "./Restaurant"
import { UsersService } from "../services/UsersService"
@Entity()
export class Users extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userName: string

  @Column()
  password: string
  @Column({ type: 'boolean', default: false })
  admin: boolean


  @OneToMany(() => Restaurant, (restaurant) => restaurant.restoVille)
  @JoinColumn({ referencedColumnName: 'restoVille' })
  restaurant: Restaurant[]

  @OneToMany(() => Commande, (commande) => commande.id)
  @JoinColumn({ name: 'id' })
  commande: Commande[]

}
