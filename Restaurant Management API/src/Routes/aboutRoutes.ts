import { Router } from "express";
import { aboutController } from "../Controllers/aboutController";
import { restaurantInfo } from "../Middleware/restaurantInfo";

const routes = Router();

routes.get("/about", restaurantInfo, aboutController);

export { routes as aboutRoutes };
