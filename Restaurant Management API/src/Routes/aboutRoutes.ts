import { Router } from "express";
import { aboutController } from "../Controllers/aboutController";

const routes = Router();

routes.get("/about", aboutController);

export { routes as aboutRoutes };
