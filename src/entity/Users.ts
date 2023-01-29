
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Unique } from "typeorm"

@Entity()
@Unique(["userName"])
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  usersId: number

  @Column({ type: "varchar" })
  userName: string

  @Column()
  password: string
  @Column({ type: 'boolean', default: false })
  admin: boolean

}