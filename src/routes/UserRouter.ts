import { Router } from "express";
import express = require("express")
import { UsersController } from "../controllers/UsersController"

const userRouter = Router()
const usersController = new UsersController();
//Routes Users
userRouter.post("/register", usersController.register);
userRouter.post("/login", usersController.login);
userRouter.get("/", usersController.allUsers);


export default userRouter;