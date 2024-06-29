import Joi from "joi";
import { NextFunction, Request, Response } from "express";

const scheme = Joi.object({
  userName: Joi.string().min(3).max(40).required().label("username"),
  email: Joi.string().email().required().label("Email"),
  password: Joi.string().min(8).required().label("Password"),
});

export class UserValidator {
  static validate(req: Request, res: Response, next: NextFunction) {
    const { error } = scheme.validate(req.body);
    if (error) {
      res.status(422).send({ message: error.details[0].message });
      return;
    }
    next();
  }
}
