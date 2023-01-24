import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, JoinColumn, OneToOne } from "typeorm"
import { Commande } from "./Commande"

@Entity()
export class Menu {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    menuName: string

    @Column({ type: 'money' })
    price: number
    @Column()
    commandeMenu: number
    @OneToOne(() => Commande, (commande) => commande.menuComm)
    @JoinColumn({ name: 'menuComm' })
    commande: Commande[]
}   
