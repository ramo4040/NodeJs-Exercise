import { Router } from "express";
import { contactController, submitContact } from "../Controllers/contactController";
import { restaurantInfo } from "../Middleware/restaurantInfo";
import { contactValidator } from "../Validation/contactValidation";

const routes = Router();

routes.get("/contact", restaurantInfo, contactController);
routes.post("/contact", contactValidator, submitContact);

export { routes as contactRoutes };
