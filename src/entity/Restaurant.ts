import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, BaseEntity, Unique } from "typeorm"
import { Commande } from "./Commande"
import { Users } from "./Users"


@Entity()
@Unique(["restoVille"])
export class Restaurant extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar')

  restoVille: string
}