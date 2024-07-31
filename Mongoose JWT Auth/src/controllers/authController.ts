import { inject, injectable } from 'inversify'
import { CookieOptions, Request, Response } from 'express'
import TYPES from '@/core/constants/TYPES'
import { IAuthController, IAuthService } from '@/core/interfaces/IAuth'

@injectable()
export default class AuthController implements IAuthController {
  /**
   * @param AuthService the service responsible for handling user registration and login logic.
   */
  constructor(@inject(TYPES.AuthService) private AuthService: IAuthService) {}

  /**
   * Handles {POST} requests '/auth/register' endpoint.
   * Handles {POST} requests '/auth/login' endpoint.
   * Handles {GET} requests '/auth/logout' endpoint.
   * @param req The Express request object
   * @param res The Express response object
   */
  register = async (req: Request, res: Response): Promise<void> => {
    const result = await this.AuthService.register(req.body)
    res.status(result.status).send(result)
  }

  login = async (req: Request, res: Response): Promise<void> => {
    const { refreshToken, accessToken, message, status } = await this.AuthService.login(req.body)
    // add token in cookie
    if (refreshToken) {
      const options: CookieOptions = {
        httpOnly: true,
        domain: 'localhost',
        path: '/',
        // secure: true, // https
        sameSite: 'strict',
      }
      res.cookie('accessToken', accessToken, { ...options, maxAge: 15 * 60 * 1000 })
      res.cookie('refreshToken', refreshToken, { ...options, maxAge: 7 * 24 * 60 * 60 * 1000 })
    }

    res.status(status).send({ message: message })
  }

  logout = async (req: Request, res: Response): Promise<void> => {
    const { refreshToken } = req.cookies
    // check if token exist and delete them
    const { success, status, message } = await this.AuthService.logout(refreshToken)
    if (success) {
      res.clearCookie('accessToken')
      res.clearCookie('refreshToken')
    }
    res.status(status).send({ message: message })
  }
}
