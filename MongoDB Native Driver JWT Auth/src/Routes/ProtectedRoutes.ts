import { TYPES } from "@/core/Constants/types";
import IAuthMiddleware from "@/core/Interfaces/IAuthMidlleware";
import IRoutes from "@/core/Interfaces/IRoutes";
import { Request, Response, Router } from "express";
import { inject, injectable } from "inversify";

@injectable()
export default class ProtectedRoutes implements IRoutes {
  public routes: Router;

  constructor(
    @inject(TYPES.AuthMiddleware) private AuthMiddleware: IAuthMiddleware
  ) {
    this.routes = Router();
    this.registerRoutes();
  }

  registerRoutes(): void {
    this.routes.get(
      "/protected",

      this.AuthMiddleware.verifyToken,

      (req: Request, res: Response) => {
        // res.send(res.locals.user); // get user info
        res.send("protected routes")
      }
    );
  }
}
