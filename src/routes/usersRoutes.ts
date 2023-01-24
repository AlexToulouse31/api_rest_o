import { AppDataSource } from "../data-source"
import express = require("express")
import { Request, Response } from "express"
import { Users } from "../entity/Users"
const app = express()
app.get("/users", async function (req: Request, res: Response) {
    const users = await AppDataSource.getRepository(Users).find()
    res.json(users)
})
app.get("/users/:id", async function (req: Request, res: Response) {
    const results = await AppDataSource.getRepository(Users).findOneBy({
        id: parseInt(req.params.id)
    })
    res.json(Users)
})