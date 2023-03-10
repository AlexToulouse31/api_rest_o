import express = require("express");
import { Router } from "express";
import { CommandesController } from "../controllers/CommandesController";
import { authenticateJWT } from "../middleware/auth";
import { Admin } from "../middleware/Admin";


const commandesRouter = Router();
const commandesController = new CommandesController();

commandesRouter.get("/", authenticateJWT, Admin, commandesController.getAllCommandes);
commandesRouter.post("/", authenticateJWT, commandesController.postCommande);
commandesRouter.delete("/:id", authenticateJWT, commandesController.deleteCommande);
commandesRouter.put("/:id", authenticateJWT, commandesController.putCommande);

export default commandesRouter;