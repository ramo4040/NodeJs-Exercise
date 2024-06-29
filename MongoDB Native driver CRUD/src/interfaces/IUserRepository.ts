import { ObjectId } from "mongodb";
import { UserModel } from "../Models/UserModel.js";

export interface IUserRepository {
  connect();
  createUser(user: UserModel): Promise<UserModel>;
  getAllUsers(): Promise<UserModel[]>;
  getUserById(id: ObjectId): Promise<UserModel>;
  deleteUser(id: ObjectId): Promise<UserModel | null>;
}
