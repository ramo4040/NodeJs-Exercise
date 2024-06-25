import { Router } from "express";
import { homeController } from "../Controllers/homeController";
import { footerInfo } from "../Middleware/footerInfo";
const routes = Router();

routes.get("/", footerInfo, homeController);

export { routes as homeRoutes };
