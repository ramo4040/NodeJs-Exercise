import { Router } from "express";
import { inject, injectable } from "inversify";
import TYPES from "../Config/types.js";
import { IUserController } from "../Interfaces/IUserController.js";
import { UserValidator } from "../Validation/UserValidator.js";

@injectable()
export class UserRoutes {
  private routes: Router;

  constructor(
    @inject(TYPES.UserController) private UserController: IUserController
  ) {
    this.routes = Router();
  }

  public registerRoutes(): Router {
    this.routes.post(
      "/users",
      UserValidator.validate,
      this.UserController.createUser
    );
    this.routes.get("/users", this.UserController.getAllUser);
    this.routes
      .route("/users/:id([a-z0-9]{24})") // check if id 24 character for mongodb
      .get(this.UserController.getUserById)
      .delete(this.UserController.deleteUser)
      .patch(UserValidator.validate, this.UserController.updateUser);

    return this.routes;
  }
}
