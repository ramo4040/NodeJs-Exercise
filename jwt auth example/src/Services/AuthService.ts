import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../Models/UserModel";

interface jwtDecode {
  userId: string;
  iat: number;
  exp: number;
}

export class AuthService {
  static async login(email, password) {
    const user = await UserModel.findUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  static async generateToken(user) {
    const token = jwt.sign(
      { userId: user.id, userRole: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE,
      }
    );
    return token;
  }

  static async verifyToken(token): Promise<jwtDecode> {
    return jwt.verify(token, process.env.JWT_SECRET) as jwtDecode;
  }
}
