import { Router } from "express";
import express = require("express")
import { RestaurantController } from "../controllers/RestaurantsController";
//import { authenticateJWT } from "../../middleware/auth";

const restaurantRouter = Router();
const restaurantController = new RestaurantController();

restaurantRouter.get("/", restaurantController.getAllRestaurant);
restaurantRouter.post("/", restaurantController.add);
restaurantRouter.delete("/:id", restaurantController.deleteRestaurant);
restaurantRouter.put("/:id", restaurantController.putRestaurant);

export default restaurantRouter;