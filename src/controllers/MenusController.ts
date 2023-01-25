import { Request, Response } from "express";
import { BaseEntity } from "typeorm";
import { Menu } from "../entity/Menu";
import { MenusService } from "../services/MenusService";

const menuService = new MenusService();

export class MenusController extends BaseEntity {

    async addMenu(req: Request, res: Response) {
        const restoMenu: string = req.body.menu;
        const priceMenu: number = req.body.price;


        if (restoMenu !== restoMenu.toString()) {
            res.status(400).json({
                status: "FAIL",
                message: "le nom du menu doit être une chaine de caractère"
            });
            return;
        }
        try {
            const menu = await menuService.addMenu(restoMenu, priceMenu);


            if (menu) {
                res.status(201).json({
                    status: "Create",
                    messsage: "Nouveau menu",
                    data: menu
                })
            } else {
                res.status(404).json({
                    status: "Fail",
                    message: "Création impossible"
                })
            }
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
        const restoId = parseInt(req.params.id);
        const name: string = req.body.menu;
        const price: number = req.body.price
        const putMenu = await menuService.putMenu(restoId, name, price);
        res.status(200).json({
            status: "Success",
            message: "Modification effectuée",
            data: putMenu
        })
    }
}