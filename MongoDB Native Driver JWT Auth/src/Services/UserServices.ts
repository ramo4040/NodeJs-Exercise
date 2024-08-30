import { inject, injectable } from "inversify";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { TYPES } from "@/core/Constants/types";
import IUserService from "@/core/Interfaces/IUserService";
import IUserRepository from "@/core/Interfaces/IUserRepository";
import { UserModel } from "@/models/UserModel";
import { env } from "@/core/config/env";

interface UserData {
  email: string;
  password: string;
}

@injectable()
export default class UserService implements IUserService {
  constructor(
    @inject(TYPES.UserRepository) private UserRepository: IUserRepository
  ) {}

  async signUp(data: UserData): Promise<UserModel | null> {
    const user = new UserModel(data.email, data.password);
    await user.hashPassword();
    return await this.UserRepository.createUser(user);
  }

  async login(data: UserModel): Promise<UserModel | null> {
    const user = await this.UserRepository.getUserByEmail(data.email);
    return user && (await bcrypt.compare(data.password, user.password))
      ? user
      : null;
  }

  async generateToken(data: UserModel): Promise<string> {
    return await Jwt.sign({ id: data._id }, env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
  }
}
