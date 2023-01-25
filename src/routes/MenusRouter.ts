import { AppDataSource } from "../data-source"
import express = require("express")
import { Request, Response, Router } from "express"
import { Menu } from "../entity/Menu"
import { MenusController } from "../controllers/MenusController";


const menuRouter = Router();
const menuController = new MenusController();

menuRouter.get("/", menuController.getAllMenu);
menuRouter.post("/", menuController.addMenu);
menuRouter.delete("/:id", menuController.deleteMenu);
menuRouter.put("/:id", menuController.putMenu);
export default menuRouter;