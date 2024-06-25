import { NextFunction, Request, Response } from "express";
import { getRestaurantInfo } from "../Model/restoranModel";

export const restaurantInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const info = await getRestaurantInfo();
  res.locals.restaurantInfo = info
  next();
};
