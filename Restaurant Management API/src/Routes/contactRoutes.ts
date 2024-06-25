import { Router } from "express";
import { contactController } from "../Controllers/contactController";
import { restaurantInfo } from "../Middleware/restaurantInfo";

const routes = Router();

routes.get("/contact", restaurantInfo, contactController);

export { routes as contactRoutes };
