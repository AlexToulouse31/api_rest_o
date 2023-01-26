import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";


const accessTokenSecret: string = process.env.ACCESSTOKENSECRET;
export const authenticateJWT = (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    if (authHeader) {
        jwt.verify(token, accessTokenSecret, (err, decode) => {
            if (err) {
                return res.status(403).json({
                    status: "FORBIDDEN",
                    message: "Clé de sécurité utilisateur incorrecte",
                });
            } if (!token) {
                res.send("Token manquant");
                return;
            }
            else {
                jwt.verify(token, accessTokenSecret, (err: any, decode: any) => {
                    if (err) {
                        return res.status(403).json({
                            status: "FORBIDDEN",
                            message: "Clé de sécurité utilisateur incorrecte",
                        });
                    } else {
                        console.log(decode);
                        req.body.token = decode.name;

                    }



                });

            };



        });
    } else {
        res.sendStatus(401).json({
            status: "Fail",
            message: "Utilisateur inconnu",
        });
    }
};

module.exports = authenticateJWT;