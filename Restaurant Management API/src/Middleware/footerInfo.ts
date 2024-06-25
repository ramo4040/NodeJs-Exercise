import { NextFunction, Request, Response } from "express";
import { getRestoranInfo } from "../Model/restoranModel";

export const footerInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const info = await getRestoranInfo();
  res.locals.footerInfo = info
  next();
};
