import { BaseEntity } from "typeorm";
import { Commande } from "../entity/Commande";
import { Menu } from "../entity/Menu";
import { Users } from "../entity/Users";

export class CommandesService extends BaseEntity {

    /*async addCommande(menu: number, client: string): Promise<Commande | undefined> {
        const commande = new Commande();
        commande.menuId = menu
        commande.userName = client

        await Commande.save(commande)
        console.log(menu);

        if (commande) {
            return commande
        } undefined
    }*/

    async selectAllCommandes(): Promise<Commande[] | undefined> {
        const comd : Commande[] | undefined = await Commande.find();
        if (comd) {
            return comd;
        }
        return undefined
    }

}

