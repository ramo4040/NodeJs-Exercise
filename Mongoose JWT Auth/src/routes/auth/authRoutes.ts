import TYPES from "@/core/constants/TYPES";
import { IAuthController, IAuthRoutes } from "@/core/interfaces/IAuth";
import { Router } from "express";
import { inject, injectable } from "inversify";

@injectable()
export default class AuthRoutes implements IAuthRoutes {
  public readonly router: Router;

  constructor(
    @inject(TYPES.AuthController) private AuthController: IAuthController
  ) {
    this.router = Router();
    this.registerRoutes();
  }

  registerRoutes(): void {
    this.router.post("/register", this.AuthController.register);
  }
}
