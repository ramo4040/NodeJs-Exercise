import { inject, injectable } from "inversify";
import { type Request, type Response } from "express";
import { TYPES } from "@/core/Constants/types";
import IUserService from "@/core/Interfaces/IUserService";
import IUserController from "@/core/Interfaces/IUserController";
import { HttpCode } from "@/core/Constants/httpStatusCode";

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
    const user = await this.UserService.login(req.body);

    if (!user) {
      res
        .status(HttpCode.NOT_FOUND)
        .send({ message: "Email or Password invalid" });
      return;
    }

    const token = await this.UserService.generateToken(user);

    res
      .status(HttpCode.OK)
      .cookie("jwt", token, {
        httpOnly: true,
        path: "/",
        domain: "localhost",
        // secure: true, // https
        sameSite: "strict",
        maxAge: 60 * 60 * 1000, // 1 hour
      })
      .send(user);
  };
}
