import { IUser } from './IUser'

export interface IPasswordHasher {
  hashPassword(password: string): Promise<string>
  comparePassword(password: string, hashedPwd: string): Promise<boolean>
}

export interface IAuthToken {
  generateAccessToken(data: IUser): Promise<string>
  generateRefreshToken(data: IUser): Promise<string>
  verify(token: string, key: string): Promise<IJwtPayload | null>
}

export interface IJwtPayload extends IUser {
  email: string
  username: string
  iat: number
  exp: number
}
