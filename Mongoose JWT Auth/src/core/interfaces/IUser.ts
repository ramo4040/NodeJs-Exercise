import { IRegistrationData } from './IAuth'
import { Document } from 'mongoose'

export interface IUser extends Document {
  username: string
  email: string
  password: string
  emailVerified: boolean
}

export interface IUserRepository<T> {
  createUser(data: IRegistrationData): Promise<T>
  findByEmail(email: string): Promise<T | null>
  //   findAll(): Promise<T[]>;
  //   update(id: string, data: T): Promise<T | null>;
  //   delete(id: string): Promise<T | null>;
}
