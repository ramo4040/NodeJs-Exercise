import { Router } from "express";
import { homeController } from "../Controllers/homeController";
import { restaurantInfo } from "../Middleware/restaurantInfo";
const routes = Router();

routes.get("/", restaurantInfo, homeController);

export { routes as homeRoutes };
