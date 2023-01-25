import { Request, Response } from "express";
import { BaseEntity } from "typeorm";
import * as bcrypt from 'bcrypt';
import * as jwt from "jsonwebtoken";
import { UsersService } from "../services/UsersService";
import { Users } from "../entity/Users";
const usersService = new UsersService();
const accessTokenSecret = process.env.ACCESSTOKENSECRET;
export class UsersController extends BaseEntity {

    async login(req: Request, res: Response) {
        const userName: string = req.body.userName;
        const password: string = req.body.password;
        try {

            const user = await usersService.getUserByName(userName);
            if (user) {
                bcrypt.compare(password, user.password, async function (err, result) {
                    if (result == true) {
                        const accessToken = jwt.sign(user.password, accessTokenSecret)
                        res.status(200).json({
                            status: "OK",
                            data: accessToken,
                            message: "logged in",
                        });
                    }

                })
            } else {
                res.status(404).json({
                    status: "fail",
                    message: "identifiant incorrect",
                    data: null,
                });
            }
        } catch (err) {
            res.status(500).json({
                status: "fail",
                message: "login erreur serveur",
            });
            console.log(err.stack);
        }
    }
    async register(req: Request, res: Response) {
        const name: string = req.body.username;
        const password: string = req.body.password;

        bcrypt.hash(password, 10, async function (err, hash) {
            try {
                const data = await usersService.addUser(name, hash);

                res.status(201).json({
                    status: "success",
                    message: "register success",
                    data: data,
                });
            } catch (err) {
                res.status(500).json({
                    status: "fail",
                    message: "register erreur serveur",
                });
                console.log(err.stack);
            }
        });
    }
    async allUsers(req: Request, res: Response) {

        try {

            const data = await usersService.allUser();


            res.status(201).json({
                status: "success",
                message: " success",
                data: data

            });
        } catch (err) {
            res.status(500).json({
                status: "fail",
                message: "register erreur serveur",
            });
            console.log(err.stack);
        }
    }
}

