import Joi from 'joi';
import { Request, Response } from 'express';

class SignUp {
  email: string;
  password: string;

  constructor(data) {
    this.email = data.email;
    this.password = data.password;
  }
}

export class AuthValidator {
  static async validate(req: Request, res: Response, next) {
    const signUpSchema = Joi.object({
      email: Joi.string().email().required().label('Email'),
      password: Joi.string().min(8).required().label('Password'),
    });

    const { error } = signUpSchema.validate(req.body);

    if (error) {
      res.status(422).send({ message: error.details[0].message });
      return;
    }

    next();
  }
}