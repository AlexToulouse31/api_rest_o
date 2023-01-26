import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, BaseEntity } from "typeorm"
import { Commande } from "./Commande"
import { Users } from "./Users"


@Entity()

export class Restaurant extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar')
  restoVille: string


}