import { env } from "@/core/config/env";
import { HttpCode } from "@/core/Constants/httpStatusCode";
import IAuthMiddleware, { decodeToken } from "@/core/Interfaces/IAuthMidlleware";
import { NextFunction, Request, Response } from "express";
import { injectable } from "inversify";
import Jwt from "jsonwebtoken";

@injectable()
export default class AuthMiddleware implements IAuthMiddleware {
  async verifyToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const token = req.cookies.jwt;

    if (!token) {
      res.status(HttpCode.UNAUTHORIZED).send({ message: "UNAUTHORIZED" });
      return;
    }

    try {
      const decode = Jwt.verify(token, env.JWT_SECRET_KEY);
      res.locals.user = decode as decodeToken;
      next();
    } catch (error) {
      res.status(HttpCode.UNAUTHORIZED).send({ message: "UNAUTHORIZED" });
    }
  }
}
