import TYPES from '@/core/constants/TYPES'
import { IAuthController, IAuthMiddleware, IAuthRoutes } from '@/core/interfaces/IAuth'
import { IAuthValidator } from '@/core/interfaces/IValidator'
import { Router } from 'express'
import { inject, injectable } from 'inversify'

@injectable()
export default class AuthRoutes implements IAuthRoutes {
  public readonly router: Router

  constructor(
    @inject(TYPES.AuthController) private AuthController: IAuthController,
    @inject(TYPES.AuthValidator) private AuthValidator: IAuthValidator,
    @inject(TYPES.AuthMiddleware) private AuthMiddleware: IAuthMiddleware,
  ) {
    this.router = Router()
    this.registerRoutes()
  }

  registerRoutes(): void {
    this.router.post('/token/refresh', this.AuthController.refreshToken)
    this.router.post('/token/validate', this.AuthMiddleware.authenticateUser, this.AuthController.handleAuthUser)
    this.router.post('/register', this.AuthValidator.validate, this.AuthController.register)
    this.router.post('/login', this.AuthValidator.validate, this.AuthController.login)
    this.router.get('/logout', this.AuthController.logout)
    this.router.get('/verify-email', this.AuthController.verifyEmail)
  }
}
