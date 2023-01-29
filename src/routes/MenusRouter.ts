
import express = require("express");
import { Router } from "express";
import { MenusController } from "../controllers/MenusController";
import { authenticateJWT } from "../middleware/auth";


const menuRouter = Router();
const menuController = new MenusController();

menuRouter.get("/", menuController.getAllMenu);
menuRouter.post("/", authenticateJWT, menuController.addMenu);
menuRouter.delete("/:id", authenticateJWT, menuController.deleteMenu);
menuRouter.put("/:id", authenticateJWT, menuController.putMenu);

export default menuRouter;