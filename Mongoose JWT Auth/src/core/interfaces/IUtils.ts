import { JwtPayload } from 'jsonwebtoken'
import { IUser } from './IUser'

export interface IPasswordHasher {
  hashPassword(password: string): Promise<string>
  comparePassword(password: string, hashedPwd: string): Promise<boolean>
}

export interface IAuthToken {
  generateToken(data: IUser): Promise<string>
  verify(token: string): Promise<JwtPayload | string | null>
}
