import { inject, injectable } from "inversify";
import IUserService from "../core/Interfaces/IUserService";
import { UserModel } from "../Models/UserModel";
import { TYPES } from "@src/core/Constants/types";
import IUserRepository from "../core/Interfaces/IUserRepository";

interface UserData {
  email: string;
  password: string;
}

@injectable()
export default class UserService implements IUserService {
  constructor(
    @inject(TYPES.UserRepository) private UserRepository: IUserRepository
  ) {}

  async signUp(data: UserData): Promise<UserModel> {
    const user = new UserModel(data.email, data.password);
    await user.hashPassword()    
    return this.UserRepository.createUser(user);
  }

  async login(email: string): Promise<UserModel | null> {
    return this.UserRepository.getUserByEmail(email);
  }
}
