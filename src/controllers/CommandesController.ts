import { Request, Response } from "express";
import { BaseEntity } from "typeorm";
import { CommandesService } from "../services/CommandesService";


const commandesService = new CommandesService();

export class CommandesController extends BaseEntity {

    /**
        * * Fonction getAllCommande sert qu'a l'admin pour consulter les menus commandés.
        * 
        */
    async getAllCommandes(req: Request, res: Response) {
        try {
            const data = await commandesService.selectAllCommandes();

            res.status(201).json({
                status: "success",
                message: " Ok",
                data: data
            });
        }
        catch (err) {
            res.status(500).json({
                status: "fail",
                message: " erreur serveur",
            });
            console.log(err.stack);
        }
    }
    /**
     * * Fonction post Commande sert a commander le menu.
     * @param req :numero du menu
     * @param req :ville du restaurant 
     * @param req :Client 
     * 
     *
     */
    async postCommande(req: Request, res: Response) {
        const commandeMenu = req.body.menu;
        const commandeVille = req.body.ville;
        const commandeUser = req.body.client;
        const detail = await commandesService.affichageCommande(commandeMenu);
        const token = req.body.idToken
        const verifMenu = await commandesService.verifMenuById(commandeMenu)
        const detailClient = await commandesService.verifUser(commandeUser)



        if (typeof commandeVille !== 'string' && typeof commandeMenu !== 'number' && typeof commandeUser !== 'string') {
            res.status(400).json({
                status: "FAIL",
                message: "la ville, le prix ou le client saisie ne corresponde pas au format défini"
            });
            return;
        };
        if (!detailClient || token !== detailClient.password) {
            res.status(400).json({
                status: "Erreur",
                message: "Veuillez vous enregistrez et vous logger avant de commander",
                data: detailClient
            });
            return;
        }

        if (!verifMenu) {
            res.status(400).json({
                status: "Fail",
                message: "Menu inexistant"
            });
            return;
        }
        try {
            const data = await commandesService.addCommande(commandeMenu, commandeVille, commandeUser);
            const commandePassée = `Commande numéro ${data.commandeId} passée sur la ville de ${data.restoVille} `
            const client = `Le client ${detailClient.userName} a commandé le ${detail.menuName} d'un montant de ${detail.price}€`
            res.status(200).json({
                status: "Ok",
                message: commandePassée,
                commande: client
            })
        } catch (err) {
            res.status(500).json({
                status: "fail",
                message: "commande erreur serveur",
            });
            console.log(err.stack);
        }
    }
    async putCommande(req: Request, res: Response) {
        const idCommande: number = parseInt(req.params.id);
        const commandeMenu = req.body.menu;
        const commandeVille = req.body.ville;
        const data = await commandesService.putCommandeById(idCommande, commandeMenu, commandeVille);
        res.status(200).json({
            status: "Ok",
            message: "Commande modifiée",
            data: data
        })
    }
    async deleteCommande(req: Request, res: Response) {
        const idCommande: number = parseInt(req.params.id);
        const data = await commandesService.deleteCommandeById(idCommande);
        const token = req.body.idToken
        const detailClient = await commandesService.verifPassword(token)


        if (typeof idCommande !== 'number') {
            res.status(400).json({
                status: "Fail",
                message: "Veuillez saisir un id au format nombre"
            });
            return;

        }
        if (!data.commandeId) {
            res.status(400).json({
                status: "Fail",
                message: "Commande inexistante"
            });
            return;
        }
        if (token !== detailClient) {
            res.status(400).json({
                status: "Fail",
                message: "blabla"
            });
            return;
        }

        try {
            res.status(200).json({
                status: "Ok",
                message: "Commande supprimée",
                data: data
            })
        } catch (err) {
            res.status(500).json({
                status: "fail",
                message: "commande delete erreur serveur",
            });
            console.log(err.stack);
        }
    }

};

