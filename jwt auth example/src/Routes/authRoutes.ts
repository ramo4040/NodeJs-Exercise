import { Router } from "express";
import { AuthValidator } from "../Validation/AuthValidator";
import { AuthController } from "../Controllers/AuthController";
import { AuthMiddleware } from "../Middleware/AuthMiddleware";

const routes = Router();

routes.post("/auth/register", AuthValidator.validate, AuthController.register);

routes.post("/auth/login", AuthValidator.validate, AuthController.login);

routes.get("/protected", AuthMiddleware.use);

export { routes as AuthRoutes };
