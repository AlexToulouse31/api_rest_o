import { Request, Response } from "express";
import { BaseEntity } from "typeorm";
import { CommandesService } from "../services/CommandesService";


const commandesService = new CommandesService();

export class CommandesController extends BaseEntity {

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
    async postCommande(req: Request, res: Response) {
        const commandeMenu = req.body.menu;
        const commandeVille = req.body.ville;
        const commandeUser = req.body.client;
        const verifMenu = await commandesService.verifMenuById(commandeMenu)
        if (!verifMenu) {
            res.status(400).json({
                status: "Fail",
                message: "Menu inexistant"
            });
            return;
        }
        if (typeof commandeVille !== 'string' && typeof commandeMenu !== 'number' && typeof commandeUser !== 'string') {
            res.status(400).json({
                status: "FAIL",
                message: "la ville, le prix et le client saisie ne corresponde pas au format défini"
            });
            return;
        };

        try {
            const data = await commandesService.addCommande(commandeMenu, commandeVille, commandeUser);
            const detail = await commandesService.affichageCommande(commandeMenu);
            const detailClient = await commandesService.verifUser(commandeUser)


            res.status(200).json({
                status: "Ok",
                message: "Commande passée",
                commande: data, detail, detailClient
            })
        } catch (err) {
            res.status(500).json({
                status: "fail",
                message: "commande erreur serveur",
            });
            console.log(err.stack);
        }
    }
};

