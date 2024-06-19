import { Request, Response, NextFunction } from "express";
import { AuthService } from "../Services/AuthService.js";

interface AuthenticatedRequest extends Request {
  user?: any;
}

export class AuthMiddleware {
  static async use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const token = req.cookies.jwt;

    if (!token) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const decode = await AuthService.verifyToken(token);
    req.user = decode;
    next()
  }
}
