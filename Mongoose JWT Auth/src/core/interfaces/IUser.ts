import { IRegistrationData } from './IAuth'
import { Document, ObjectId } from 'mongoose'

export interface IUser {
  _id: ObjectId
  username: string
  email: string
  password: string
  emailVerified: boolean
}

export interface IUserRefreshToken extends Document {
  _id: ObjectId
  userId: ObjectId
  refreshToken: string
}

export interface IUserRepository<T> {
  createUser(data: IRegistrationData): Promise<T>
  findByEmail(email: string): Promise<T | null>
  //   findAll(): Promise<T[]>;
  //   update(id: string, data: T): Promise<T | null>;
  //   delete(id: string): Promise<T | null>;
}

export interface IRefreshTokenRepo<T> {
  create(userId: ObjectId, refreshToken: string): Promise<void>
  findByRefreshToken(refreshToken: string): Promise<T | null>
  deleteByRefreshToken(refreshToken: string): Promise<IUserRefreshToken | null>
}
