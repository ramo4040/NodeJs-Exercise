import { Router } from "express";
import { inject, injectable } from "inversify";
import TYPES from "../Config/types.js";
import { IUserController } from "../Interfaces/IUserController.js";
import { UserValidator } from '../Validation/UserValidator.js';

@injectable()
export class UserRoutes {
  private routes: Router;

  constructor(
    @inject(TYPES.UserController) private UserController: IUserController
  ) {
    this.routes = Router();
  }

  public registerRoutes(): Router {
    this.routes.post("/users", UserValidator.validate, this.UserController.createUser);
    return this.routes;
  }
}
