import { UserModel } from "../Models/UserModel.js";

export interface IUserService {
  createUser(user: UserModel): Promise<UserModel>;
  getAllUsers();
  getUserById(id: string): Promise<UserModel>;
  deleteUser(id: string): Promise<UserModel | null>;
}
