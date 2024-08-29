import { Request, Response, NextFunction } from "express";
import { AuthService } from "../Services/AuthService";
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

    await AuthService.verifyToken(token)
      .then((decode) => {
        if (decode) {
          req.user = decode;
          next();
          return
        }
         res.status(401).json({ error: "Unauthorized" });
      })
      .catch((err) => { // if token not found 
        res.status(401).json({ error: "Unauthorized" });
        return;
      });
  }
}
