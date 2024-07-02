import { type Router } from "express";

export default interface IRoutes {
  routes: Router;
  registerRoutes(): void;
}
