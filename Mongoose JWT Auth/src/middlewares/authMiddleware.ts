import env from '@/core/config/env'
import TYPES from '@/core/constants/TYPES'
import { IAuthMiddleware } from '@/core/interfaces/IAuth'
import { IRefreshTokenRepo, IUserRefreshToken } from '@/core/interfaces/IUser'
import { IAuthToken } from '@/core/interfaces/IUtils'
import { CookieOptions, NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'inversify'

@injectable()
export default class AuthMiddleware implements IAuthMiddleware {
  constructor(
    @inject(TYPES.AuthToken) private AuthToken: IAuthToken,
    @inject(TYPES.RefreshTokenRepo) private RefreshTokenRepo: IRefreshTokenRepo<IUserRefreshToken>,
  ) {}

  verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { accessToken, refreshToken } = req.cookies

    const decodeAccessToken = await this.AuthToken.verify(accessToken, env.ACCESS_TOKEN.secret)
    // access token  valid
    if (decodeAccessToken) {
      res.locals.user = decodeAccessToken
      next()
      return
    }

    const decodeRefreshToken = await this.AuthToken.verify(refreshToken, env.REFRESH_TOKEN.secret)
    // if access token invalid or expired
    if (decodeRefreshToken) {
      // check if refresh token exist
      const isRefreshTokenValid = await this.RefreshTokenRepo.findByRefreshToken(refreshToken)

      if (isRefreshTokenValid && decodeRefreshToken._id.toString() === isRefreshTokenValid.userId.toString()) {
        // Generate a new access token
        const newAccessToken = await this.AuthToken.generateAccessToken(decodeRefreshToken)
        const options: CookieOptions = {
          httpOnly: true,
          domain: 'localhost',
          path: '/',
          // secure: true, // https
          sameSite: 'strict',
        }
        //set new access token
        res.locals.user = newAccessToken
        res.cookie('accessToken', newAccessToken, { ...options, maxAge: 15 * 60 * 1000 })
        next()
        return
      }

      // if refresh token not valid
      res.status(401).send({ message: 'UNAUTHORIZED' })
      return
    }

    //if (access token - refresh token) invalid
    res.status(401).send({ message: 'UNAUTHORIZED' })
  }
}
