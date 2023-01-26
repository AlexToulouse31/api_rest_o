import { AppDataSource } from "../data-source";
import express = require("express");
import { Request, Response, Router } from "express";
import { MenusController } from "../controllers/MenusController";
import { authenticateJWT } from "../middleware/auth";
import { Admin } from "../middleware/Admin";

const menuRouter = Router();
const menuController = new MenusController();

menuRouter.get("/", menuController.getAllMenu);
menuRouter.post("/", authenticateJWT, Admin, menuController.addMenu);
menuRouter.delete("/:id", authenticateJWT, Admin, menuController.deleteMenu);
menuRouter.put("/:id", authenticateJWT, Admin, menuController.putMenu);

export default menuRouter;