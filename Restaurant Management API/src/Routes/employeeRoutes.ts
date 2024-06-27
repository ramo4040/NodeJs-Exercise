import { Router } from "express";
import { authMiddleware } from "../Middleware/authMiddleware";
import * as employeeController from "../Controllers/employeeController";
import { employeeValidator } from "../Validation/employeeValidator";
import upload from "../Config/multer";

const routes = Router();

routes.post(
  "/admin/employees",
  authMiddleware,
  upload.single("image"),
  employeeValidator,
  employeeController.addNewEmployee
);

export { routes as employeeRoutes };
