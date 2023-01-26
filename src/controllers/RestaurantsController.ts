import { Request, Response } from "express";
import { BaseEntity } from "typeorm";
import { Restaurant } from "../entity/Restaurant";
import { RestaurantService } from "../services/RestaurantsService";


const restaurantService = new RestaurantService();

export class RestaurantController extends BaseEntity {
    async add(req: Request, res: Response) {
        const restoVille: string = req.body.restaurant;
        const restoCherche = await restaurantService.getRestaurantByTown(restoVille);
        if (restoCherche) {
            res.status(400).json({
                status: "Fail",
                message: "Restaurant déjà existant"
            });
            return;
        }
        if (restoVille !== restoVille.toString()) {
            res.status(400).json({
                status: "FAIL",
                message: "le nom du restaurant doit être une chaine de caractère"
            });
            return;
        }
        try {
            const restau = await restaurantService.addRestaurant(restoVille);
            if (restau) {
                res.status(201).json({
                    status: "Create",
                    messsage: "Nouveau restaurant",
                    data: restau
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
    async getAllRestaurant(req: Request, res: Response) {

        try {

            const data = await restaurantService.allRestaurant();


            res.status(201).json({
                status: "success",
                message: " Ok",
                data: data

            });
        } catch (err) {
            res.status(500).json({
                status: "fail",
                message: " erreur serveur",
            });
            console.log(err.stack);
        }

    }
    async getRestaurantByTown(req: Request, res: Response) {
        const restoName: string = req.params.name;

        try {
            const chercheResto = await restaurantService.getRestaurantByTown(restoName);
            res.status(201).json({
                status: "success",
                message: " Ok",
                data: chercheResto

            });
        } catch (err) {
            res.status(500).json({
                status: "fail",
                message: " erreur serveur",
            });
            console.log(err.stack);
        }
    }
    async deleteRestaurant(req: Request, res: Response) {
        const id: number = parseInt(req.params.id);
        try {
            const delRestau = restaurantService.deleteRestaurant(id);
            res.status(200).json({
                status: "SUCCESS",
                message: "Restaurant fermé",
                data: (await delRestau).restoVille
            })
        } catch (err) {
            res.status(500).json({
                status: "fail",
                message: " erreur serveur",
            });
            console.log(err.stack);
        }
    }
    async putRestaurant(req: Request, res: Response) {

        const restoChoice: string = req.body.restaurant;
        const idPutResto: number = parseInt(req.params.id)
        const test = await restaurantService.verifByid(idPutResto);
        if (!test || typeof restoChoice !== 'string' || typeof idPutResto !== 'number') {
            res.status(400).json({
                status: "FAIL",
                message: "Le restaurant n'existe pas ou bien le format des données saisies est incorrect"
            });
            return;
        }

        try {

            const putResto = await restaurantService.updateRestaurant(idPutResto, restoChoice);

            res.status(200).json({
                status: "Success",
                message: "Modification effectuée",
                data: putResto
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