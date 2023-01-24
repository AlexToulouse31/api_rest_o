import { AppDataSource } from "./data-source"
import { Users } from "./entity/Users"
import { Restaurant } from "./entity/Restaurant"
import { Menu } from "./entity/Menu"
import { Commande } from "./entity/Commande"
import express = require("express")
import { Request, Response } from "express"
const app = express()
AppDataSource.initialize().then(async () => {
}).catch(error => console.log(error))

app.use(express.json())

//Routes
