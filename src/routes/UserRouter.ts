import { Router } from "express";
import { UsersController } from "../controllers/UsersController";
import { authenticateJWT } from "../middleware/auth";

const userRouter = Router();
const usersController = new UsersController();

userRouter.post("/register", usersController.register);
userRouter.post("/login", usersController.login);
userRouter.get("/", authenticateJWT, usersController.allUsers);


export default userRouter;