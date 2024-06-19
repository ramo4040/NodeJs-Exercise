import { UserModel } from "../Models/UserModel.js";
import bcrypt from "bcrypt";

export class UserService {
  static async createUser(data) {
    const hash = await bcrypt.hash(data.password, 10);
    data.password = hash;
    return await UserModel.createUser(data);
  }

  static async findUserByEmail(email) {
    return UserModel.findUserByEmail(email);
  }
}
