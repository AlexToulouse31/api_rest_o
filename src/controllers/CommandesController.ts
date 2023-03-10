import { Request, Response } from "express";
import { restart } from "nodemon";
import { BaseEntity } from "typeorm";
import { CommandesService } from "../services/CommandesService";


const commandesService = new CommandesService();

export class CommandesController extends BaseEntity {

    /**
        * * Fonction getAllCommande sert qu'a l'admin pour consulter les menus commandés.
        * 
        */
    async getAllCommandes(req: Request, res: Response) {
        const token = req.body.idToken
        const detailClient = await commandesService.verifPassword(token)
        const admin = detailClient.admin;

        if (!admin) {
            res.status(400).json({
                status: "Fail",
                message: "Vous n'êtes pas autorisez à consulter toutes les commandes"
            })

        }
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
     * * condition 1 : les parametres de la commande sont au bon format
     * * condition 2 : le client existe et il est bien logger avec son token
     * * condition 3 : le menu existe
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
    /**
     * fonction putCommande
     * @param req Id de la commande
     * @param req menu que l'on veux modifier
     * @param req Ville que l'on veux changer
     * * condition 1 : les parametres de la commande sont au bon format
     * * condition 2: vérification que la commande existe
     * * condition 3: Que le token est bon
     */
    async putCommande(req: Request, res: Response) {
        const idCommande: number = parseInt(req.params.id);
        const commandeMenu = req.body.menu;
        const commandeVille = req.body.ville;
        const token = req.body.idToken;
        const detailClient = await commandesService.verifPassword(token)
        const controlleCommande = await commandesService.getCommandeById(idCommande)

        if (typeof idCommande !== 'number' || typeof commandeMenu !== 'number' || typeof commandeVille !== 'string') {
            res.status(400).json({
                status: "Fail",
                message: "Veuillez rentrer un id au format nombre"
            });
            return;
        }
        if (!controlleCommande) {
            res.status(400).json({
                status: "Fail",
                message: "Commande inexistante"
            });
            return;
        }
        if (token !== detailClient.password) {
            res.status(400).json({
                status: "Fail",
                message: "Vous n'êtes pas autorisé à modifier cette commande"
            });
            return;
        }

        try {
            const data = await commandesService.putCommandeById(idCommande, commandeMenu, commandeVille);
            res.status(200).json({
                status: "Ok",
                message: "Commande modifiée",
                data: data
            })
        }
        catch (err) {
            res.status(500).json({
                status: "fail",
                message: "commande put erreur serveur",
            });
            console.log(err.stack);
        }
    }
    /**
     * fonction deleteCommande
     * @param req Id de la commande
     * 
     * * condition 1 : le parametre de l'ID est au bon format
     * * condition 2: vérification que la commande existe
     * * condition 3: Que le token est bon
     */
    async deleteCommande(req: Request, res: Response) {
        const idCommande: number = parseInt(req.params.id);
        const controlleCommande = await commandesService.getCommandeById(idCommande)
        const token = req.body.idToken
        const detailClient = await commandesService.verifPassword(token)




        if (typeof idCommande !== 'number') {
            res.status(400).json({
                status: "Fail",
                message: "Veuillez saisir un id au format nombre"
            });
            return;

        }
        if (!controlleCommande) {
            res.status(400).json({
                status: "Fail",
                message: "Commande inexistante"
            });
            return;
        }
        if (token !== detailClient.password) {
            res.status(400).json({
                status: "Fail",
                message: "Vous n'êtes pas autorisé à supprimé cette commande "
            });
            return;
        }

        try {
            const data = await commandesService.deleteCommandeById(idCommande);
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

