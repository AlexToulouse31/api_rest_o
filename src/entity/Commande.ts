import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, BaseEntity } from "typeorm"
import { Menu } from "./Menu"
import { Restaurant } from "./Restaurant"
import { Users } from "./Users"
@Entity()
export class Commande extends BaseEntity {
  @PrimaryGeneratedColumn()
  commandeId: number

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.restoVille,)
  @JoinColumn({ referencedColumnName: "restoVille" })
  restoVille: string

  @ManyToOne(() => Users, (users) => users.userName, { cascade: true })
  userName: string


  @ManyToOne(() => Menu, (menu) => menu.menuId)
  menuId: number


}
