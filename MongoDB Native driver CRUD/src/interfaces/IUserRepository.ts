import { UserModel } from "../Models/UserModel.js";

export interface IUserRepository {
  connect();
  createUser(user: UserModel): Promise<UserModel>;
}
