import { UserModel } from "../Models/UserModel.js";

type UserOrNull = UserModel | null
export interface IUserService {
  createUser(user: UserModel): Promise<UserModel>;
  getAllUsers();
  getUserById<UserOrNull>(id: string);
  deleteUser<UserOrNull>(id: string);
}
