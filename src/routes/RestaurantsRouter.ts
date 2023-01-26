import { Router } from "express";
import express = require("express")
import { RestaurantController } from "../controllers/RestaurantsController";
import { authenticateJWT } from "../middleware/auth";
import { Admin } from "../middleware/Admin";

const restaurantRouter = Router();
const restaurantController = new RestaurantController();

restaurantRouter.get("/", restaurantController.getAllRestaurant);
restaurantRouter.get("/:name", restaurantController.getRestaurantByName);
restaurantRouter.post("/", authenticateJWT, Admin, restaurantController.add);
restaurantRouter.delete("/:id", authenticateJWT, Admin, restaurantController.deleteRestaurant);
restaurantRouter.put("/:id", authenticateJWT, Admin, restaurantController.putRestaurant);

export default restaurantRouter;