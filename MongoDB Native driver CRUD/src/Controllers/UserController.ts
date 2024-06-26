import { Request, Response } from "express";
import { IUserController } from "../Interfaces/IUserController.js";
import { inject, injectable } from "inversify";
import { IUserService } from "../Interfaces/IUserService.js";
import TYPES from "../Config/types.js";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

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
    if (result) {
      res.status(200).send(result);
      return;
    }
    res.status(404).send({ message: `User Id : ${id} Not found` });
  };

  deleteUser = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const result = await this.UserService.deleteUser(id);
    if (result) {
      res.status(200).send({ message: "User has been deleted" });
      return;
    }
    res.status(404).send({ message: "User Id not found " });
  };

  updateUser = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const result = await this.UserService.updateUser(id, req.body);
    if (result) {
      res.status(201).send({ message: `User Id : ${id} has been updated` });
      return;
    }
    res.status(404).send({ message: `User Id : ${id} not found` });
  };
}
