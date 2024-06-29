import { Request, Response } from "express";
import { IUserController } from "../Interfaces/IUserController.js";
import { inject, injectable } from "inversify";
import { IUserService } from "../Interfaces/IUserService.js";
import TYPES from "../Config/types.js";

@injectable()
export class UserController implements IUserController {
  constructor(@inject(TYPES.UserService) private UserService: IUserService) {}

  createUser = async (req: Request, res: Response): Promise<void> => {
    const result = await this.UserService.createUser(req.body);
    res.status(201).send(result);
  };

  getAllUser = async (req: Request, res: Response): Promise<void> => {
    const result = await this.UserService.getAllUsers();
    res.status(200).send(result);
  };

  getUserById = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const result = await this.UserService.getUserById(id);
    res.status(200).send(result);
  };
}
