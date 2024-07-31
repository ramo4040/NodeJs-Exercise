import { IUserRefreshToken } from '@/core/interfaces/IUser'
import { Model, model, Schema, Types } from 'mongoose'

const userRefreshToken = new Schema<IUserRefreshToken>(
  {
    userId: { type: Types.ObjectId },
    refreshToken: { type: String, required: true },
  },
  { collection: 'userRefreshToken' },
)

const UserRefreshTokenModel: Model<IUserRefreshToken> = model('userRefreshTokenModel', userRefreshToken)

export default UserRefreshTokenModel
