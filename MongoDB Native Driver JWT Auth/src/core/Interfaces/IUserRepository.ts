import { UserModel } from "@/models/UserModel";

export default interface IUserRepository {
  createUser<UserModel>(user: UserModel): Promise<UserModel | null>;
  getUserByEmail(user: string): Promise<UserModel | null>;
}
