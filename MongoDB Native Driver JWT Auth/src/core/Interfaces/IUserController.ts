import { type Request, type Response } from "express";

export default interface IUserController {
  signUp(req: Request, res: Response): void;
  login(req: Request, res: Response): void;
}
