import { Request, Response } from "express";

export const homeController = async (req: Request, res: Response) => {
  res.render("index");
};
