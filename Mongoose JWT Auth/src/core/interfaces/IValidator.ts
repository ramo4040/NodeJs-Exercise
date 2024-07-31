import { NextFunction, Request, Response } from 'express'

export interface IAuthValidator {
  loginValidate(req: Request, res: Response, next: NextFunction): Promise<void>
  registerValidate(req: Request, res: Response, next: NextFunction): Promise<void>
}
