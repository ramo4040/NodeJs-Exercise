import { NextFunction, Request, Response } from "express";

export default interface IUserValidation {
  validate(req: Request, res: Response, next: NextFunction): Promise<void>;
}
