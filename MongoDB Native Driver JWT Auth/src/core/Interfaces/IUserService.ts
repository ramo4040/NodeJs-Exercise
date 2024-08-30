import { type UserModel } from "@/models/UserModel";

export default interface IUserService {
  signUp(data: unknown): Promise<UserModel | null>;
  login(data: UserModel): Promise<UserModel | null>;
  generateToken(data: UserModel): Promise<string>;
}
