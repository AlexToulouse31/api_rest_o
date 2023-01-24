import { Router } from "express";
import express = require("express")
import { UsersController } from "../controllers/UsersController"

const userRouter = Router()
const usersController = new UsersController();

userRouter.post("/register", usersController.register);
userRouter.get("/login", usersController.login);


export default userRouter;