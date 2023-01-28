import { BaseEntity } from "typeorm";
import { Commande } from "../entity/Commande";
import { Menu } from "../entity/Menu";
import { Users } from "../entity/Users";
import { UsersService } from "./UsersService";

export class CommandesService extends BaseEntity {

    async addCommande(menu: number, resto: string): Promise<Commande | undefined> {
        const commande = new Commande();
        commande.menuId = menu
        commande.restoVille = resto
        await Commande.save(commande)

        if (commande) {
            return commande
        } undefined
    }

    async selectAllCommandes(): Promise<Commande[] | undefined> {
        const comd: Commande[] | undefined = await Commande.find();
        if (comd) {
            return comd;
        }
        return undefined
    } async affichageCommande(menu: number): Promise<Menu | undefined> {

        const tmenu = await Menu.createQueryBuilder().select("menu")
            .from(Menu, "menu").where('Menu.menuId = :id', { id: menu }).getOne()

        if (tmenu) {
            return tmenu

        }
    }
    async verifMenuById(menu: number): Promise<Menu | undefined> {
        const menuid: Menu | undefined = await Menu.findOneBy({ menuId: menu });
        console.log(menuid);


        if (menuid) {
            return menuid;
        }
        return undefined
    }

}

