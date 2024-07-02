import { Router } from "express";
import { inject, injectable } from "inversify";
import IUserController from "../core/Interfaces/IUserController";
import { TYPES } from "@src/core/Constants/types";
import IUserValidation from "../core/Interfaces/IUserValidation";

@injectable()
export class UserRoutes {
  public routes: Router;

  constructor(
    @inject(TYPES.UserController) private UserController: IUserController,
    @inject(TYPES.UserValidation) private UserValidation: IUserValidation
  ) {
    this.routes = Router();
    this.registerRoutes();
  }

  public registerRoutes(): void {
    this.routes.post(
      "/register",
      this.UserValidation.validate,
      this.UserController.signUp
    );
    this.routes.post(
      "/login",
      this.UserValidation.validate,
      this.UserController.login
    );
  }
}
