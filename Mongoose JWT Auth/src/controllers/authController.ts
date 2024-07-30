import { inject, injectable } from 'inversify'
import { Request, Response } from 'express'
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
   * @param req The Express request object
   * @param res The Express response object
   */
  register = async (req: Request, res: Response): Promise<void> => {
    const result = await this.AuthService.register(req.body)
    res.status(result.status).send(result)
  }
}
