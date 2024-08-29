
import { Request, Response } from "express";
import { UserService } from "../Services/UserService";
import { AuthService } from "../Services/AuthService";


export class AuthController {
  static async register(req: Request, res: Response) {
    const data = req.body;
    const user = await UserService.createUser(data);
    
    if (!user.status && "message" in user) {
      return res.status(422).send({ message: user.message });
    }

    res.status(201).send(data);
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await AuthService.login(email, password);

    if (user) {
      const token = await AuthService.generateToken(user);

      res
        .cookie("jwt", token, {
          httpOnly: true,
          maxAge: 1200000,
        })
        .status(200)
        .send({ message: "Login successful!" });

      return;
    }

    res.status(403).send({ message: "Invalid email or password" });
  }
}
