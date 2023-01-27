import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, BaseEntity } from "typeorm"
import { Menu } from "./Menu"
import { Restaurant } from "./Restaurant"
import { Users } from "./Users"
@Entity()
export class Commande extends BaseEntity {
  @PrimaryGeneratedColumn()
  commandeId: number

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.restoVille, { cascade: ["insert", "update"] })
  restaurant: Restaurant[]

  @ManyToOne(() => Users, (users) => users.userName, { cascade: ["insert", "update"] })
  userName: string


  @ManyToOne(() => Menu, (menu) => menu.menuId, { cascade: ["insert", "update"] })

  menuId: number


}
