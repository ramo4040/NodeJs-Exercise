import { type Request, type Response, type NextFunction } from "express";

export type decodeToken = {
  id: string;
  iat: number;
  exp: number;
};

export default interface IAuthMiddleware {
  verifyToken(req: Request, res: Response, next: NextFunction): Promise<void>;
}
