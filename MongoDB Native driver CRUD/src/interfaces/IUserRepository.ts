import { ObjectId } from "mongodb";
import { UserModel } from "../Models/UserModel.js";

type UserOrNull = UserModel | null

export interface IUserRepository {
  connect();
  createUser(user: UserModel): Promise<UserModel>;
  getAllUsers(): Promise<UserModel[]>;
  getUserById<UserOrNull>(id: ObjectId);
  deleteUser<UserOrNull>(id: ObjectId);
}
