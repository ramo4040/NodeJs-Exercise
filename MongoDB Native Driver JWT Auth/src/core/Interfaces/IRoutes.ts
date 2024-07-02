import { type Router } from "express";

export default interface IRoutes {
  registerRoutes(): Router;
}
