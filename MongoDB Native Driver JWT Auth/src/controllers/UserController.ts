import { inject, injectable } from "inversify";
import IUserController from "../core/Interfaces/IUserController";
import { TYPES } from "@src/core/Constants/types";
import IUserService from "../core/Interfaces/IUserService";
import { type Request, type Response } from "express";

@injectable()
export default class UserController implements IUserController {
  constructor(@inject(TYPES.UserService) private UserService: IUserService) {}

  signUp = async (req: Request, res: Response): Promise<void> => {
    const user = await this.UserService.signUp(req.body);
    res.send(user);
  };

  login = async (req: Request, res: Response): Promise<void> => {
    const user = await this.UserService.login(req.body.email);
    res.send(user);
  };
}
