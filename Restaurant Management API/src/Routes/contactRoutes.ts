import { Router } from "express";
import { contactController } from "../Controllers/contactController";
import { footerInfo } from "../Middleware/footerInfo";

const routes = Router();

routes.get("/contact", footerInfo, contactController);

export { routes as contactRoutes };
