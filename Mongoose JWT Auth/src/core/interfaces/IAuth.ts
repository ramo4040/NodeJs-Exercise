import { type Request, type Response, type Router } from 'express'
import { IUser } from './IUser'

export interface IAuthController {
  register(req: Request, res: Response): Promise<void>
  login(req: Request, res: Response): Promise<void>
}

export interface IAuthService {
  register(data: IRegistrationData): Promise<IStatusMessage>
  login(data: IRegistrationData): Promise<IStatusMessage>
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
  status: number
  message: string
  user?: IUser | null
}
