import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, BaseEntity } from "typeorm"
import { Menu } from "./Menu"
import { Restaurant } from "./Restaurant"
import { Users } from "./Users"
@Entity()
export class Commande extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  /*  @ManyToOne(() => Restaurant, (restaurant) => restaurant.commandeRest)
    @JoinColumn({ name: 'commandeRest' })
    commande: Commande[]
    @ManyToOne(() => Users, (users) => users.commUsers)
    @JoinColumn({ name: 'commUsers' })
    users: Users[]
    @ManyToOne(() => Menu, (menu) => menu.commandeMenu)
    @JoinColumn({ name: 'commandeMenu' })
    menu: Menu[]*/
}
