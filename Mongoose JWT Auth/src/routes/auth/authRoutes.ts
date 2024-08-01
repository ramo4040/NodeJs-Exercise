import TYPES from '@/core/constants/TYPES'
import { IAuthController, IAuthRoutes } from '@/core/interfaces/IAuth'
import { IAuthValidator } from '@/core/interfaces/IValidator'
import { Router } from 'express'
import { inject, injectable } from 'inversify'

@injectable()
export default class AuthRoutes implements IAuthRoutes {
  public readonly router: Router

  constructor(
    @inject(TYPES.AuthController) private AuthController: IAuthController,
    @inject(TYPES.AuthValidator) private AuthValidator: IAuthValidator,
  ) {
    this.router = Router()
    this.registerRoutes()
  }

  registerRoutes(): void {
    this.router.post('/register', this.AuthValidator.registerValidate, this.AuthController.register)
    this.router.post('/login', this.AuthValidator.loginValidate, this.AuthController.login)
    this.router.get('/logout', this.AuthController.logout)
    this.router.get('/verify-email', this.AuthController.verifyEmail)
  }
}
