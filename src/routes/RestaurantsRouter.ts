import { Router } from "express";
import { RestaurantController } from "../controllers/RestaurantsController";
import { authenticateJWT } from "../middleware/auth";


const restaurantRouter = Router();
const restaurantController = new RestaurantController();

restaurantRouter.get("/", restaurantController.getAllRestaurant);
restaurantRouter.get("/:name", restaurantController.getRestaurantByTown);
restaurantRouter.post("/", authenticateJWT, restaurantController.add);
restaurantRouter.delete("/:id", authenticateJWT, restaurantController.deleteRestaurant);
restaurantRouter.put("/:id", authenticateJWT, restaurantController.putRestaurant);

export default restaurantRouter;