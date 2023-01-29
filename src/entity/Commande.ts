import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BaseEntity } from "typeorm"
import { Menu } from "./Menu"
import { Restaurant } from "./Restaurant"
import { Users } from "./Users"
@Entity()

export class Commande extends BaseEntity {
  @PrimaryGeneratedColumn()
  commandeId: number

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.restoVille, {
    cascade: ["insert", "update"], onDelete: "CASCADE", nullable: false,

    eager: true,
  })
  @JoinColumn({ referencedColumnName: "restoVille" })
  restoVille: string



  @ManyToOne(() => Users, (users) => users.usersId, {
    cascade: ["insert", "update"], onDelete: "CASCADE", nullable: false, eager: true
  })
  @JoinColumn({ referencedColumnName: "userName" })
  usersName: string


  @ManyToOne(() => Menu, (menu) => menu.menuId, {
    cascade: ["insert", "update"], onDelete: "CASCADE", nullable: false,

    eager: true,
  })
  @JoinColumn()
  menuId: number


}
