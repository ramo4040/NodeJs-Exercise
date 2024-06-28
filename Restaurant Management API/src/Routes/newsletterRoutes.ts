import { Router } from "express";
import { create } from "../Controllers/newsletterController";
import { newsLetterValidator } from '../Validation/newsLetterValidator';
const routes = Router();

routes.post("/newsletter", newsLetterValidator ,create);

export { routes as newsletterRoutes };
