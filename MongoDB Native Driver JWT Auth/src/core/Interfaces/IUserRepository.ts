import { type UserModel } from "@/src/Models/UserModel";

export default interface IUserRepository {
  createUser<UserModel>(user: UserModel): Promise<UserModel | null>;
  getUserByEmail(user: string): Promise<UserModel | null>;
}
