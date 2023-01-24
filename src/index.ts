import { AppDataSource } from "./data-source"
import { Users } from "./entity/Users"
import { Restaurant } from "./entity/Restaurant"
import { Menu } from "./entity/Menu"
import { Commande } from "./entity/Commande"
import express = require("express")
import { Request, Response } from "express"
import userRouter from "./routes/UserRouter"

AppDataSource.initialize().then(async () => {
    const app = express();
    const port = 8000;
    app.use(express.json())



    app.use(function (req: Request, res: Response, next) {
        res.setHeader('authorization', '');
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

        // Request methods you wish to allow
        res.setHeader(
            'Access-Control-Allow-Methods',
            'GET, POST, OPTIONS, PUT, PATCH, DELETE'
        );

        // Request headers you wish to allow
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        );

        // Pass to next layer of middleware
        next();
    });
    //Routes
    app.use("/api", userRouter);
    app.all("*", function (req, res) {
        res.status(404).end("index not found");
    });
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
}).catch(error => console.log(error))


