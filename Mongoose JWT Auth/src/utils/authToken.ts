import env from '@/core/config/env'
import { IUser } from '@/core/interfaces/IUser'
import { IAuthToken, IJwtPayload } from '@/core/interfaces/IUtils'
import { injectable } from 'inversify'
import jwt from 'jsonwebtoken'

@injectable()
export default class AuthToken implements IAuthToken {
  /**
   * function responsible to generating a jwt token when user login with success
   * @param data object container user information
   * @returns jwt token @type String
   */
  async generateAccessToken(data: IUser): Promise<string> {
    return await jwt.sign({ _id: data._id }, env.ACCESS_TOKEN.secret, {
      expiresIn: env.ACCESS_TOKEN.expire,
    })
  }

  async generateRefreshToken(data: IJwtPayload): Promise<string> {
    return await jwt.sign({ _id: data._id }, env.REFRESH_TOKEN.secret, {
      expiresIn: env.REFRESH_TOKEN.expire,
    })
  }

  async generateVerifyEmailToken(username: string): Promise<string> {
    return await jwt.sign({ username: username }, env.VERIFY_EMAIL.secret, {
      expiresIn: env.VERIFY_EMAIL.expire,
    })
  }

  /**
   * @param token token from cookie when user need to acces some protected resources
   * @returns decode object container user Information stored in jwt token
   */
  async verify(token: string, key: string): Promise<IJwtPayload | null> {
    try {
      const decodedToken = (await jwt.verify(token, key)) as IJwtPayload
      return decodedToken
    } catch (error) {
      // if token undefined
      return null
    }
  }
}
