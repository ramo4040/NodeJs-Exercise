import env from '@/core/config/env'
import { IUser } from '@/core/interfaces/IUser'
import { IAuthToken } from '@/core/interfaces/IUtils'
import { injectable } from 'inversify'
import jwt, { JwtPayload } from 'jsonwebtoken'

@injectable()
export default class AuthToken implements IAuthToken {
  /**
   * function responsible to generating a jwt token when user login with success
   * @param data object container user information
   * @returns jwt token @type String
   */
  async generateToken(data: IUser): Promise<string> {
    return await jwt.sign({ id: data.id, email: data.email, username: data.username }, env.jwt_token, {
      expiresIn: '1h',
    })
  }

  /**
   * @param token token from cookie when user need to acces some protected resources
   * @returns decode object container user Information stored in jwt token
   */
  async verify(token: string): Promise<JwtPayload | string | null> {
    try {
      const decodedToken = await jwt.verify(token, env.jwt_token)
      return decodedToken
    } catch (error) {
      // if token undefined
      return null
    }
  }
}
