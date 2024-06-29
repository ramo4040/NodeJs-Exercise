import { ObjectId } from "mongodb";
import { UserModel } from "../Models/UserModel.js";

type UserOrNull = UserModel | null;

export interface IUserRepository {
  connect();
  createUser<UserModel>(user: UserModel): Promise<UserModel>;
  getAllUsers<UserModel>(): Promise<UserModel[]>;
  getUserById<UserOrNull>(id: ObjectId): Promise<UserOrNull>;
  deleteUser<UserOrNull>(id: ObjectId): Promise<UserOrNull>;
  updateUser<UserModel>(id: ObjectId, user: UserModel);
}
