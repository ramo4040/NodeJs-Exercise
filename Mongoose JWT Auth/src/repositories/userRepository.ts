import { IRegistrationData } from '@/core/interfaces/IAuth'
import { IUser, IUserRepository } from '@/core/interfaces/IUser'
import { UserModel } from '@/models/user.model'
import { injectable } from 'inversify'
import { UpdateWriteOpResult } from 'mongoose'

@injectable()
export default class UserRepository implements IUserRepository<IUser> {
  /**
   * @param data object containing the user information
   * @returns promise user object from mongodb
   */
  async createUser(data: IRegistrationData): Promise<IUser> {
    return await UserModel.create({
      username: data.username,
      email: data.email,
      password: data.password,
    })
  }

  /**
   *
   * @param email user email @type String
   * @returns user if found if not return null
   */
  async findOne(data: Partial<IUser>): Promise<IUser | null> {
    return await UserModel.findOne(data).exec()
  }

  async update(filter: Partial<IUser>, data: Partial<IUser>): Promise<UpdateWriteOpResult> {
    return await UserModel.updateOne(filter, { $set: data })
  }
}
