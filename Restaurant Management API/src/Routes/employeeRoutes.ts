import { Router } from "express";

const routes = Router();

routes.get("/admin/employees");

export { routes as contactRoutes };
