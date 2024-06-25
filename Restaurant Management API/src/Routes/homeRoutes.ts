import { Router } from "express";
import { homeController } from "../Controllers/homeController";
const routes = Router();

routes.get("/", homeController);

export { routes as homeRoutes };
