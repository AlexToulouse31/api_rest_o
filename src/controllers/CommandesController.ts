import { Request, Response } from "express";
import { BaseEntity } from "typeorm";
import { CommandesService } from "../services/CommandesService";
const commandesService = new CommandesService();
export class CommandesController extends BaseEntity {
    async addMenu(req: Request, res: Response) {
        const clientCommande = req.body.client;
        const menuCommande = req.body.menu;

        try {
            const commande = await commandesService.addCommande(clientCommande, menuCommande);
            res.status(200).json({
                status: 'Ok',
                message: 'Commande effectuée',
                data: commande
            })

        } catch (err) {
            res.status(500).json({
                status: "fail",
                message: "commande erreur serveur",
            });
            console.log(err.stack);
        }


    }
}