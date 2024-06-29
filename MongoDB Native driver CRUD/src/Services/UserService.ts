import { inject, injectable } from "inversify";
import { IUserService } from "../Interfaces/IUserService.js";
import { UserModel } from "../Models/UserModel.js";
import { IUserRepository } from "../Interfaces/IUserRepository.js";
import { ObjectId } from "mongodb";
import TYPES from "../Config/types.js";

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: IUserRepository
  ) {}

  async createUser(body): Promise<UserModel> {
    const { userName, email, password } = body;
    const _id = new ObjectId();
    const user = new UserModel(_id, userName, email, password);
    user.createdAt = new Date();
    return this.userRepository.createUser(user);
  }

  async getAllUsers() {
    return this.userRepository.getAllUsers();
  }
}
