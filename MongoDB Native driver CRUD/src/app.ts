import "reflect-metadata";
import dotenv from "dotenv";
import express, { Application } from "express";
import { inject, injectable } from "inversify";
import TYPES from "./Config/types.js";
import { IUserRoutes } from "./Interfaces/IUserRoutes.js";
@injectable()
export class App {
  private readonly app: Application;
  private readonly PORT: number;

  constructor(@inject(TYPES.UserRoutes) private UserRoutes: IUserRoutes) {
    this.app = express();
    this.PORT = parseInt(process.env.PORT) || 3000;
    this.init();
    
  }

  private init() {
    dotenv.config();
    this.initMiddlewares();
    this.initRoutes();
  }

  private initMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initRoutes() {
    this.app.use("/api", this.UserRoutes.registerRoutes());
  }

  public listen() {
    this.app.listen(this.PORT, () => {
      console.log(`Server is running on http://localhost:${this.PORT}`);
    });
  }
}
