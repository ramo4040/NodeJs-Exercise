import TYPES from '@/core/constants/TYPES'
import { IAuthMiddleware } from '@/core/interfaces/IAuth'
import { IAuthToken } from '@/core/interfaces/IUtils'
import { Request, Response, NextFunction } from 'express'
import { inject, injectable } from 'inversify'

@injectable()
export default class AuthMiddleware implements IAuthMiddleware {
  constructor(@inject(TYPES.AuthToken) private AuthToken: IAuthToken) {}

  verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const decodeToken = await this.AuthToken.verify(req.cookies.jwt)

    if (!decodeToken) {
      res.status(401).send({ message: 'UNAUTHORIZED' })
      return
    }

    res.locals.user = decodeToken
    next()
  }
}
