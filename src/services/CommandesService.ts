import { BaseEntity } from "typeorm";
import { Commande } from "../entity/Commande";
import { Menu } from "../entity/Menu";
import { Users } from "../entity/Users";

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
    }

    async putCommandeById(id: number, commandeMenu: string, commandeVille: string): Promise<Commande | undefined> {
        const updateCommande: Commande | undefined = await Commande.findOneBy({ commandeId: id })
        await Commande.save(updateCommande)
        if (updateCommande) {
            return updateCommande
        }
        return undefined
    }

    async deleteCommandeById(id: number): Promise<Commande | undefined> {
        const removeId = await Commande.findBy({ commandeId: id })
        await Commande.remove(removeId)
        if (removeId === undefined) {
            return undefined
        }
        return removeId[0]
    }
}

