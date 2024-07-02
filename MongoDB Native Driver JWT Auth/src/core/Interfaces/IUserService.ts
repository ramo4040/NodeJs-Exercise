import { type UserModel } from "@/src/Models/UserModel";

export default interface IUserService {
  signUp(data: unknown): Promise<UserModel | null>;
  login(data: unknown): Promise<UserModel | null>;
}
