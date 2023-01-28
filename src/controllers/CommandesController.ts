import { Request, Response } from "express";
import { BaseEntity } from "typeorm";
import { Menu } from "../entity/Menu";
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
        const verifMenu = await commandesService.verifMenuById(commandeMenu)
        if (!verifMenu) {
            res.status(400).json({
                status: "Fail",
                message: "Menu inexistant"
            });
            return;
        }
        if (typeof commandeVille !== 'string' && typeof commandeMenu !== 'number') {
            res.status(400).json({
                status: "FAIL",
                message: "la ville et le prix saisie ne corresponde pas au format défini"
            });
            return;
        };

        try {
            const data = await commandesService.addCommande(commandeMenu, commandeVille);
            const detail = await commandesService.affichageCommande(commandeMenu);


            res.status(200).json({
                status: "Ok",
                message: "Commande passée",
                commande: data, detail
            })
        } catch (err) {
            res.status(500).json({
                status: "fail",
                message: " erreur serveur",
            });
            console.log(err.stack);
        }
    }
};

