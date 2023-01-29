import { Request, Response } from "express";
import { BaseEntity } from "typeorm";
import { MenusService } from "../services/MenusService";

const menuService = new MenusService();

export class MenusController extends BaseEntity {

    async addMenu(req: Request, res: Response) {
        const restoMenu: string = req.body.menu;
        const priceMenu: number = parseInt(req.body.price);
        const verifMenu = await menuService.verifMenuByMenu(restoMenu);


        if (typeof restoMenu !== 'string' && typeof priceMenu !== 'number') {
            res.status(400).json({
                status: "FAIL",
                message: "le nom incrit et le prix saisie ne corresponde pas au format défini"
            });
            return;
        } if (verifMenu) {
            res.status(400).json({
                status: "Fail",
                message: "Menu déjà existant"
            });
            return;
        }
        try {
            const menu = await menuService.addMenu(restoMenu, priceMenu);

            res.status(201).json({
                status: "Create",
                messsage: "Nouveau menu",
                data: menu
            })
        } catch (err) {
            res.status(500).json({
                status: "fail",
                message: "login erreur serveur",
            });
            console.log(err.stack);
        }
    }

    async getAllMenu(req: Request, res: Response) {
        try {
            const data = await menuService.selectAllMenu();
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

    async deleteMenu(req: Request, res: Response) {
        const id: number = parseInt(req.params.id);
        const verifDelMenuId = await menuService.selectMenuById(id);
        if (!verifDelMenuId || typeof id !== 'number') {
            res.status(400).json({
                status: "Fail",
                message: "Menu inexistant"
            });
            return;
        }
        try {
            const delMenu = menuService.deleteMenu(id);
            res.status(200).json({
                status: "SUCCESS",
                message: "Menu supprimé",
                data: delMenu
            })
        }
        catch (err) {
            res.status(500).json({
                status: "fail",
                message: " erreur serveur",
            });
            console.log(err.stack);
        }
    }

    async putMenu(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const restoMenu: string = req.body.menu;
        const price: number = req.body.price;
        const verifPutMenuId = await menuService.selectMenuById(id);

        if (typeof restoMenu !== 'string' || typeof price !== 'number' || typeof id !== 'number') {
            res.status(400).json({
                status: "FAIL",
                message: "le nom incrit , le prix et l'id saisie ne correspondent pas au format défini"
            });
            return;
        } if (!verifPutMenuId) {
            res.status(400).json({
                status: "Fail",
                message: "Menu inexistant"
            });
            return;


        }
        try {
            const putMenu = await menuService.putMenu(id, restoMenu, price);
            res.status(200).json({
                status: "Success",
                message: "Modification effectuée",
                data: putMenu
            })
        } catch (err) {
            res.status(500).json({
                status: "fail",
                message: " erreur serveur",
            });
            console.log(err.stack);
        }
    }
}