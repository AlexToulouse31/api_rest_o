import { Router } from "express";
import express = require("express");
import { UsersController } from "../controllers/UsersController";
import { Admin } from "../middleware/Admin";
import { authenticateJWT } from "../middleware/auth";

const userRouter = Router();
const usersController = new UsersController();

userRouter.post("/register",authenticateJWT, Admin, usersController.register);
userRouter.post("/login",authenticateJWT, Admin,usersController.login);
userRouter.get("/",authenticateJWT, Admin,usersController.allUsers);


export default userRouter;