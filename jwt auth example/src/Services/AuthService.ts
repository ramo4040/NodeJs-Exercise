import bcrypt from "bcrypt";
import { UserModel } from "../Models/UserModel.js";
import jwt from "jsonwebtoken";

export class AuthService {
  static async login(email, password) {
    const user = await UserModel.findUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  static async generateToken(user) {
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return token;
  }

  static async verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
}
