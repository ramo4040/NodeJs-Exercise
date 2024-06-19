import { Router } from "express";
import { AuthController } from "../Controllers/AuthController.js";
import { AuthValidator } from "../Validation/AuthValidator.js";
import { AuthMiddleware } from "../Middleware/AuthMiddleware.js";

const routes = Router();

routes.post("/auth/register", AuthValidator.validate, AuthController.register);

routes.post("/auth/login", AuthValidator.validate, AuthController.login);

routes.get("/protected", AuthMiddleware.use);

export { routes as AuthRoutes };
