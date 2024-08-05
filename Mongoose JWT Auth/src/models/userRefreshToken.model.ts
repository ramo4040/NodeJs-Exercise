import { IUserRefreshToken } from '@/core/interfaces/IUser'
import { Model, model, Schema } from 'mongoose'

const userRefreshToken = new Schema<IUserRefreshToken>(
  {
    refreshToken: { type: String, required: true },
  },
  { collection: 'userRefreshToken' },
)

const UserRefreshTokenModel: Model<IUserRefreshToken> = model('userRefreshTokenModel', userRefreshToken)

export default UserRefreshTokenModel
