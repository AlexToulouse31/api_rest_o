import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";


const accessTokenSecret = process.env.ACCESSTOKENSECRET!;


export function authenticateJWT(req: Request, res: Response, next: () => void) {
    const authHeader = req.headers.authorization;
    const token: string = authHeader.split(" ")[1];

    if (authHeader) {
        jwt.verify(token, accessTokenSecret, (err: any, decode: any) => {
            if (err) {
                return res.status(403).json({
                    status: "Fail",
                    message: "Clé de sécurité utilisateur incorrecte",
                });
            }
            else {
                req.body.idToken = decode;
                req.body.admin = decode.admin;
                next();


            }
        });
    } else {
        res.status(500).json({
            status: "Fail",
            message: "Vous devez être connecter pour accéder à ces fonctions"
        })
    }
}































