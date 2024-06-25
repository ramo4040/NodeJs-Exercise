import { Router } from "express";
import { contactController } from "../Controllers/contactController";

const routes = Router();

routes.get("/contact", contactController);

export { routes as contactRoutes };
