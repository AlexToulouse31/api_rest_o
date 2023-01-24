import { AppDataSource } from "../data-source"
import express = require("express")
import { Request, Response, Router } from "express"
import { Users } from "../entity/Users"
const app = express()
const userRouter = Router()


const users = new Users()

app.post("/users", async function (req: Request, res: Response) {
    console.log(req.body);
    try {

        const users = new Users()
        users.userName = req.body.username
        users.password = req.body.password
        users.admin = false
        await users.save()


        const user = await Users.find()


        res.json(users)

    } catch (error) {
        console.log(error);

    }

})
/*app.get("/users/:id", async function (req: Request, res: Response) {
    const results = await AppDataSource.getRepository(Users).findOneBy({
        id: parseInt(req.params.id)
    })
    res.json(Users)
})*/
export default userRouter