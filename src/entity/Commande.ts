import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, BaseEntity } from "typeorm"
import { Menu } from "./Menu"
import { Restaurant } from "./Restaurant"
import { Users } from "./Users"
@Entity()
export class Commande extends BaseEntity {
  @PrimaryGeneratedColumn()
  commandeId: number

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.restoVille, { cascade: true })
  restoVille: string

  @ManyToOne(() => Users, (users) => users.userName, { cascade: true })
  userName: string

 @ManyToOne(() => Menu, (menu) => menu.menuId, { cascade: true })
  menuId: number
  
}
