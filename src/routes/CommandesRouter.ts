import { AppDataSource } from "../data-source";
import express = require("express");
import { Request, Response, Router } from "express";
import { CommandesController } from "../controllers/CommandesController";
import { authenticateJWT } from "../middleware/auth";
import { Admin } from "../middleware/Admin";

const commandesRouter = Router();
const commandesController = new CommandesController();

commandesRouter.get("/", commandesController.getAllCommandes);
commandesRouter.post("/", authenticateJWT, commandesController.postCommande);
//commandesRouter.delete("/:id", authenticateJWT, commandesController.deleteMenu);
//commandesRouter.put("/:id", authenticateJWT, commandesController.putMenu);

export default commandesRouter;