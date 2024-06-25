import { Router } from "express";
import { aboutController } from "../Controllers/aboutController";
import { footerInfo } from "../Middleware/footerInfo";

const routes = Router();

routes.get("/about", footerInfo, aboutController);

export { routes as aboutRoutes };
