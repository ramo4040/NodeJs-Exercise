import { Request, Response } from "express";
import * as mealModel from "../Model/mealModel";

const addNewMeal = async (req: Request, res: Response) => {
  const meal = await mealModel.createMeal(req.body);
  res.send(meal);
};

export { addNewMeal };
