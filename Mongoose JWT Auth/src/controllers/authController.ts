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
   * Handles {POST} requests '/token/validate' endpoint. to validate user token
   * Handles {POST} requests '/auth/register' endpoint.
   * Handles {POST} requests '/auth/login' endpoint.
   * Handles {GET} requests '/auth/logout' endpoint.
   * Handles {GET} requests '/auth/verify-email' endpoint.
   * @param req The Express request object
   * @param res The Express response object
   */

  handleAuthUser = async (req: Request, res: Response): Promise<void> => {
    if (res.locals.isValid) {
      res.status(200).end()
      return
    }
    res.status(401).send({ message: 'UNAUTHORIZED' })
  }

  refreshToken = async (req: Request, res: Response): Promise<void> => {
    const { status, success, refreshToken, accessToken } = await this.AuthService.handleRefreshToken(
      req.cookies.refreshToken,
    )

    if (success) {
      const options: CookieOptions = {
        domain: 'localhost',
        // secure:true, // https only
        httpOnly: true,
        sameSite: 'strict',
      }

      res.cookie('accessToken', accessToken, { ...options, path: '/', maxAge: 15 * 60 * 1000 })
      res.cookie('refreshToken', refreshToken, {
        ...options,
        path: '/api/v1/auth/token/refresh',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
    }

    res.status(status).end()
  }

  register = async (req: Request, res: Response): Promise<void> => {
    const result = await this.AuthService.register(req.body)
    res.status(result.status).send(result)
  }

  login = async (req: Request, res: Response): Promise<void> => {
    const result = await this.AuthService.login(req.body)
    // add token in cookie
    if (result.success) {
      const options: CookieOptions = {
        httpOnly: true,
        domain: 'localhost',
        // secure: true, // https
        sameSite: 'strict',
      }

      res.cookie('accessToken', result.accessToken, { ...options, path: '/', maxAge: 15 * 60 * 1000 })
      res.cookie('refreshToken', result.refreshToken, {
        ...options,
        path: '/api/v1/auth/token/refresh',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
    }

    delete result.accessToken
    delete result.refreshToken
    res.status(result.status).send(result)
  }

  logout = async (req: Request, res: Response): Promise<void> => {
    const { accessToken } = req.cookies
    // check if token exist and delete them
    const { success, status, message } = await this.AuthService.logout(accessToken)
    if (success) {
      res.clearCookie('accessToken')
      res.clearCookie('refreshToken')
    }
    res.status(status).send({ message: message })
  }

  verifyEmail = async (req: Request, res: Response): Promise<void> => {
    // check if token is valid and user exist
    const { status, message } = await this.AuthService.verifyEmail(req.query.token as string)
    res.status(status).send({ message: message })
  }
}
