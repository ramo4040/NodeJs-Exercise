import { Request, Response } from "express";
import { getAllEmployees } from "../Model/employeeModel";
import { getCategories } from "../Model/categoryModel";
import { getAllMeals } from "../Model/mealModel";

export const homeController = async (req: Request, res: Response) => {
  const employees = await getAllEmployees();
  const mealCategories = await getCategories();
  const meals = await getAllMeals();
  res.render("index", { employees, mealCategories, meals });
};
