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
        const data = await commandesService.addCommande(commandeMenu, commandeVille);
        res.status(200).json({
            status: "Ok",
            message: "Commande passée",
            data: data
        })
    }
};

