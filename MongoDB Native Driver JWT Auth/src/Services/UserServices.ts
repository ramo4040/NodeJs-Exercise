import { inject, injectable } from "inversify";
import IUserService from "../core/Interfaces/IUserService";
import { UserModel } from "../Models/UserModel";
import { TYPES } from "@src/core/Constants/types";
import IUserRepository from "../core/Interfaces/IUserRepository";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { env } from "../core/Config/env";

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
    const isEmailExists = await this.UserRepository.getUserByEmail(data.email);
    if (isEmailExists) return null;

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
