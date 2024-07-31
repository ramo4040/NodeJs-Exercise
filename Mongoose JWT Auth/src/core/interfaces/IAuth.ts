import { NextFunction, type Request, type Response, type Router } from 'express'
import { IUser } from './IUser'

export interface IAuthController {
  register(req: Request, res: Response): Promise<void>
  login(req: Request, res: Response): Promise<void>
  logout(req: Request, res: Response): Promise<void>
}

export interface IAuthService {
  register(data: IRegistrationData): Promise<IStatusMessage>
  login(data: IRegistrationData): Promise<IStatusMessage>
  logout(refreshToken: string): Promise<IStatusMessage>
}
export interface IAuthRoutes {
  router: Router
  registerRoutes(): void
}
export interface IRegistrationData {
  username: string
  email: string
  password: string
  confirmPassword: string
}
export interface IStatusMessage {
  success: boolean
  status: number
  message: string
  user?: IUser | null
  accessToken?: string
  refreshToken?: string
}

export interface IAuthMiddleware {
  verifyToken(req: Request, res: Response, next: NextFunction): Promise<void>
}
