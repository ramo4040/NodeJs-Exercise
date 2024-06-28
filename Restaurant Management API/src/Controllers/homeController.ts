import { Request, Response } from "express";
import { getAllEmployees } from "../Model/employeeModel";

export const homeController = async (req: Request, res: Response) => {
  const employees = await getAllEmployees();

  res.render("index", { employees });
};
