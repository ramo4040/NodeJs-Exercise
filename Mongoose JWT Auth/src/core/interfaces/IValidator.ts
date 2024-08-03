import { NextFunction, Request, Response } from 'express'

export interface IAuthValidator {
  validate(req: Request, res: Response, next: NextFunction): Promise<void>
}
