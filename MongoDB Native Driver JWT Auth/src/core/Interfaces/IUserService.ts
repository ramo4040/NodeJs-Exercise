import { type UserModel } from "@/src/Models/UserModel";

export type decodeToken = {
  id: string;
  iat: number;
  exp: number;
};

export default interface IUserService {
  signUp(data: unknown): Promise<UserModel | null>;
  login(data: UserModel): Promise<UserModel | null>;
  generateToken(data: UserModel): Promise<string>;
  verify(token: string): Promise<decodeToken>;
}
