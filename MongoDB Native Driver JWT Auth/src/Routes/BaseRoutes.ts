import { TYPES } from "@/core/Constants/types";
import IRoutes from "@/core/Interfaces/IRoutes";
import { Router } from "express";
import { inject, injectable } from "inversify";

@injectable()
export default class BaseRoutes {
  public readonly routes: Router;

  constructor(
    @inject(TYPES.UserRoutes) private UserRoutes: IRoutes,
    @inject(TYPES.ProtectedRoutes) private ProtectedRoutes: IRoutes
  ) {
    this.routes = Router();
    this.registerRoutes();
  }

  registerRoutes(): void {
    this.routes.use("/auth", this.UserRoutes.routes);
    this.routes.use(this.ProtectedRoutes.routes);
  }
}
