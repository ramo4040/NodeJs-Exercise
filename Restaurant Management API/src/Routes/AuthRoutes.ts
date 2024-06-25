import { Router } from "express";
import { adminLogin } from "../Controllers/AuthController";
const routes = Router();

routes.post("/admin/auth/login", adminLogin);

export { routes as authRoutes };
