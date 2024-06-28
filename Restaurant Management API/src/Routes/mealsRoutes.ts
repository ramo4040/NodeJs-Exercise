import { Router } from "express";
import { authMiddleware } from "../Middleware/authMiddleware";
import { addNewMeal } from "../Controllers/mealController";
import upload from "../Config/multer";

const routes = Router();

routes.post("/admin/meals", authMiddleware, upload.single("image"), addNewMeal);

export { routes as mealsRoutes };
