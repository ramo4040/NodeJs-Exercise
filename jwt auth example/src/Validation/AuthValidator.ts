import * as jf from "joiful";
import { Request, Response } from "express";

class SignUp {
  @jf.string().email().required().label("Email")
  email: string;

  @jf.string().min(8).required().label("Password")
  password: string;

  constructor(data) {
    this.email = data.email;
    this.password = data.password;
  }
}

export class AuthValidator {
  static async validate(req: Request, res: Response, next) {
    const signUp = new SignUp(req.body);
    const { error } = jf.validate(signUp);

    if (error) {
      res.status(422).send({ message: error.details[0].message });
      return;
    }

    next();
  }
}
