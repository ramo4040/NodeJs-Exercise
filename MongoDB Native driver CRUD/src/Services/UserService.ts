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

  async createUser<T>(body): Promise<T> {
    const { userName, email, password } = body;
    const _id = new ObjectId();
    const user = new UserModel(_id, userName, email, password);
    user.createdAt = new Date();
    return this.userRepository.createUser(user) as T;
  }

  async getAllUsers() {
    return this.userRepository.getAllUsers();
  }

  async getUserById<T>(id: string): Promise<T> {
    const objId = new ObjectId(id);
    return await this.userRepository.getUserById(objId);
  }

  async deleteUser<T>(id: string): Promise<T> {
    const objId = new ObjectId(id);
    return await this.userRepository.deleteUser(objId);
  }

  async updateUser(id: string, body) {
    const { userName, email, password } = body;
    const _id = new ObjectId(id);
    const user = new UserModel(_id, userName, email, password);
    user.updatedAt = new Date();
    
    for (const key in user) {
      if (user.hasOwnProperty(key) && user[key] == undefined) {
        delete user[key]
      }
    }    

    return await this.userRepository.updateUser(_id, user);
  }
}
