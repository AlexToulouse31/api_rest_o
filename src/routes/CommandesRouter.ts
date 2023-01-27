import { AppDataSource } from "../data-source";
import express = require("express");
import { Request, Response, Router } from "express";
import { CommandesController } from "../controllers/CommandesController";
import { authenticateJWT } from "../middleware/auth";
import { Admin } from "../middleware/Admin";
const commandesRouter = Router();
const commandesController = new CommandesController();
//commandesRouter.get("/", commandesController.get);
commandesRouter.post("/", authenticateJWT, Admin, commandesController.addMenu);
//commandesRouter.delete("/:id", authenticateJWT, Admin, commandesController.deleteMenu);
//commandesRouter.put("/:id", authenticateJWT, Admin, commandesController.putMenu);

export default commandesRouter;