import { AppDataSource } from "./data-source"
import { Users } from "./entity/Users"
import { Restaurant } from "./entity/Restaurant"
import { Menu } from "./entity/Menu"
import { Commande } from "./entity/Commande"
import express = require("express")
import { Request, Response } from "express"
const app = express();
const port = 8000;
AppDataSource.initialize().then(async () => {
}).catch(error => console.log(error))

app.use(express.json())

//Routes
app.get("/users/:id", async function (req: Request, res: Response) {
    const results = await AppDataSource.getRepository(Users).findOneBy({
        id: parseInt(req.params.id)
    })
    res.json(Users)
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
