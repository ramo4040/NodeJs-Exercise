import { Request, Response, NextFunction } from "express";
import { AuthService } from "../Services/AuthService.js";
import { UserRole } from "@prisma/client";
interface AuthenticatedRequest extends Request {
  user?: any;
}

export class AuthMiddleware {
  static async use(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    const token = req.cookies.jwt;
    const allowedRoles: UserRole[] = [UserRole.ADMIN, UserRole.MANAGER];

    await AuthService.verifyToken(token)
      .then((decode) => {
        if (allowedRoles.includes(decode.userRole)) { // check user role
          req.user = decode;
          next();
        }else{
          res.status(401).json({ error: "Unauthorized" });
        }
      })
      .catch((err) => { // if token not found 
        res.status(401).json({ error: "Unauthorized" });
        return;
      });
  }
}
