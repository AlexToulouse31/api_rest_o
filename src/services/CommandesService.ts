import { BaseEntity } from "typeorm";
import { Commande } from "../entity/Commande";
import { Menu } from "../entity/Menu";
import { Users } from "../entity/Users";

export class CommandesService extends BaseEntity {

    async addCommande(menu: number, resto: string, client: string): Promise<Commande | undefined> {
        const commande = new Commande();
        commande.menuId = menu
        commande.restoVille = resto
        commande.usersName = client

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
    async getCommandeById(idCommande: number): Promise<Commande[] | undefined> {
        const comd: Commande[] | undefined = await Commande.findBy({ commandeId: idCommande });
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

    async affichageCommande(menu: number): Promise<Menu | undefined> {

        const AfficheMenu = await Menu.createQueryBuilder().select("menu")
            .from(Menu, "menu").where('Menu.menuId = :id', { id: menu }).getOne()

        if (AfficheMenu) {
            return AfficheMenu

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
    async verifUser(client: string): Promise<Users | undefined> {
        const users: Users | undefined = await Users.findOneBy({ userName: client });

        if (users) {
            return users;
        }
        return undefined;

    }
    async verifPassword(token: string): Promise<Users | undefined> {
        const users: Users | undefined = await Users.findOneBy({ password: token });

        if (users) {
            return users;
        }
        return undefined;

    }

    async affichUser(client: string): Promise<Users | undefined> {
        const users: Users | undefined = await Users.findOneBy({ userName: client });


        if (users) {
            return users;
        }
        return undefined;

    }

}

