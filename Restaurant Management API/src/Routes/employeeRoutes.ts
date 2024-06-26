import { Router } from "express";
import { authMiddleware } from "../Middleware/authMiddleware";
import * as employeeController from "../Controllers/employeeController";

const routes = Router();

routes.get(
  "/admin/employees",
  authMiddleware,
  employeeController.addNewEmployee
);

export { routes as employeeRoutes };
