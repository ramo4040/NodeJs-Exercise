import TYPES from '@/core/constants/TYPES'
import { IAuthRoutes } from '@/core/interfaces/IAuth'
import IBaseRoutes from '@/core/interfaces/IRoutes'
import { Router } from 'express'
import { inject, injectable } from 'inversify'

@injectable()
export default class BaseRoutes implements IBaseRoutes {
  public router: Router
  constructor(@inject(TYPES.AuthRoutes) private AuthRoutes: IAuthRoutes) {
    this.router = Router()
    this.registerRoutes()
  }

  registerRoutes() {
    this.router.use('/auth', this.AuthRoutes.router)
  }
}
