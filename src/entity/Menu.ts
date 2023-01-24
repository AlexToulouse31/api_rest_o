import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, JoinColumn, OneToOne, BaseEntity } from "typeorm"
import { Commande } from "./Commande"

@Entity()
export class Menu extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    menuName: string

    @Column({ type: 'numeric' })
    price: number
    @Column()
    commandeMenu: number
    @OneToOne(() => Commande, (commande) => commande.menuComm)
    @JoinColumn({ name: 'menuComm' })
    commande: Commande[]
}   
