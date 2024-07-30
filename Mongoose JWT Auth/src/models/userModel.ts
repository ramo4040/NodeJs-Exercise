import { IUser } from '@/core/interfaces/IUser'
import { Schema, model, Model } from 'mongoose'

const userSchema = new Schema<IUser>(
  {
    username: { type: String, unique: true, index: true, required: true },
    email: {
      type: String,
      unique: true,
      index: true,
      required: true,
    },
    password: { type: String, required: true },
    emailVerified: { type: Boolean, default: false },
  },
  { collection: 'Users' },
)

export const UserModel: Model<IUser> = model('Users', userSchema)
