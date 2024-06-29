import { UserModel} from "../Models/UserModel.js";
import { Request} from 'express';

type UserOrNull = UserModel | null;
export interface IUserService {
  createUser(user: UserModel): Promise<UserModel>;
  getAllUsers();
  getUserById<UserOrNull>(id: string);
  deleteUser<UserOrNull>(id: string);
  updateUser(id: string, user);
}
