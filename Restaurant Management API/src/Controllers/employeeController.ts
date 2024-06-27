import { Request, Response } from "express";
import { createEmployee } from "../Model/employeeModel";


const addNewEmployee = async (req: Request, res: Response) => {
  const employee = await createEmployee(req.body);
  res.status(201).send(employee);
};

export { addNewEmployee };
