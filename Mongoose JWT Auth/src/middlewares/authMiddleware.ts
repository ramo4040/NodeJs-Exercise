import env from '@/core/config/env'
import TYPES from '@/core/constants/TYPES'
import { IAuthMiddleware } from '@/core/interfaces/IAuth'
import { IAuthToken } from '@/core/interfaces/IUtils'
import { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'inversify'

@injectable()
export default class AuthMiddleware implements IAuthMiddleware {
  constructor(@inject(TYPES.AuthToken) private AuthToken: IAuthToken) {}

  authenticateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { accessToken } = req.cookies

    const decodeAccessToken = await this.AuthToken.verify(accessToken, env.ACCESS_TOKEN.secret)
    // access token  valid
    if (decodeAccessToken) {
      res.locals.isValid = true
      next()
      return
    }

    //if (access token) invalid
    res.locals.isValid = false
    next()
  }
}
