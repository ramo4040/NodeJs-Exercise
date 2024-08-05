import { IRefreshTokenRepo, IUserRefreshToken } from '@/core/interfaces/IUser'
import UserRefreshTokenModel from '@/models/userRefreshToken.model'
import { injectable } from 'inversify'
import { ObjectId } from 'mongoose'

@injectable()
export default class RefreshTokenRepo implements IRefreshTokenRepo<IUserRefreshToken> {
  async create(userId: ObjectId, refreshToken: string): Promise<void> {
    await UserRefreshTokenModel.create({ userId: userId, refreshToken: refreshToken })
  }

  async findByRefreshToken(oldRefreshToken: string, newRefreshToken: string): Promise<IUserRefreshToken | null> {
    return await UserRefreshTokenModel.findOneAndUpdate(
      { refreshToken: oldRefreshToken },
      { refreshToken: newRefreshToken },
    )
  }

  async deleteByUserId(userId: ObjectId): Promise<IUserRefreshToken | null> {
    return await UserRefreshTokenModel.findOneAndDelete({ userId: userId })
  }
}
