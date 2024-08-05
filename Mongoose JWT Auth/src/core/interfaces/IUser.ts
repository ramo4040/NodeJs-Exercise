import { IRegistrationData } from './IAuth'
import { Document, ObjectId, UpdateWriteOpResult } from 'mongoose'

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
  findOne(data: Partial<T>): Promise<T | null>
  update(filter: Partial<T>, data: Partial<T>): Promise<UpdateWriteOpResult>
  //   findAll(): Promise<T[]>;
  //   delete(id: string): Promise<T | null>;
}

export interface IRefreshTokenRepo<T> {
  create(userId: ObjectId, refreshToken: string): Promise<void>
  findByRefreshToken(oldRefreshToken: string, newRefreshToken: string): Promise<T | null>
  deleteByUserId(userId: ObjectId): Promise<IUserRefreshToken | null>
}
