import { NextFunction, Request, Response } from "express";
import IAuthMiddleware from "../core/Interfaces/IAuthMidlleware";
import { injectable } from "inversify";
import Jwt from "jsonwebtoken";
import { env } from "../core/Config/env";
import { decodeToken } from "../core/Interfaces/IAuthMidlleware";
import { HttpCode } from "../core/Constants/httpStatusCode";

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
      const decode = await Jwt.verify(token, env.JWT_SECRET_KEY);
      res.locals.user = decode as decodeToken;
      next();
    } catch (error) {
      res.status(HttpCode.UNAUTHORIZED).send({ message: "UNAUTHORIZED" });
    }
  }
}
