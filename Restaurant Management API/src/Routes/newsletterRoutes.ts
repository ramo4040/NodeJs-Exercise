import { Router } from "express";
import { create } from "../Controllers/newsletterController";
const routes = Router();

routes.post("/newsletter", create);

export { routes as newsletterRoutes };
