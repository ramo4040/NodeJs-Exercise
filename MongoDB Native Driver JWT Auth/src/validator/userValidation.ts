import { HttpCode } from "@/core/Constants/httpStatusCode";
import IUserValidation from "@/core/Interfaces/IUserValidation";
import { NextFunction, Request , Response } from "express";
import { injectable } from "inversify";
import Joi from "joi";

@injectable()
class UserValidation implements IUserValidation {
  private static readonly schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(8).required().label("Passwrod"),
  });

  async validate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { error } = UserValidation.schema.validate(req.body);

    if (error) {
      res
        .status(HttpCode.INVALID_INPUT)
        .send({ message: error.details[0].message });
      return;
    }
    next();
  }
}

export default UserValidation;
