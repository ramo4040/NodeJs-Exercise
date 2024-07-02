import { Router } from "express";
import { inject, injectable } from "inversify";
import IUserController from "../core/Interfaces/IUserController";
import { TYPES } from "@src/core/Constants/types";

@injectable()
export class UserRoutes {
  private routes: Router;

  constructor(
    @inject(TYPES.UserController) private UserController: IUserController
  ) {
    this.routes = Router();
  }

  public registerRoutes(): Router {
    this.routes.post("/auth/register", this.UserController.signUp);
    this.routes.post("/auth/login", this.UserController.login);

    return this.routes;
  }
}
