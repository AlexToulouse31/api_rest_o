import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Unique } from "typeorm"



@Entity()
@Unique(["restoVille"])
export class Restaurant extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar')

  restoVille: string
}