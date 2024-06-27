import { config } from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
config();

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {  
  const token = req.cookies.jwt;
  if (token) {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.user = decode
    return next();
  }

  res.status(401).send({ error: "Unauthorized" });
};
