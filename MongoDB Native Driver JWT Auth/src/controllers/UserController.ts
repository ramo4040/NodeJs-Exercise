import { inject, injectable } from "inversify";
import IUserController from "../core/Interfaces/IUserController";
import { TYPES } from "@src/core/Constants/types";
import IUserService from "../core/Interfaces/IUserService";
import { type Request, type Response } from "express";
import { HttpCode } from "../core/Constants/httpStatusCode";

@injectable()
export default class UserController implements IUserController {
  constructor(@inject(TYPES.UserService) private UserService: IUserService) {}

  signUp = async (req: Request, res: Response): Promise<void> => {
    const user = await this.UserService.signUp(req.body);
    if (!user) {
      res.status(HttpCode.CONFLICT).send({ message: "Email already exist" });
      return;
    }
    res.status(HttpCode.CREATED).send(user);
  };

  login = async (req: Request, res: Response): Promise<void> => {
    const user = await this.UserService.login(req.body.email);
    if (!user) {
      res
        .status(HttpCode.NOT_FOUND)
        .send({ message: "Email or Password invalid" });
      return;
    }
    res.status(HttpCode.OK).send(user);
  };
}
