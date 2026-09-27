import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
  };
}

export const authenticateJWT = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_ACCESS_SECRET || "default_access_secret";

    jwt.verify(token, secret, (err, user) => {
      if (err) {
        res.status(401).json({ error: "Unauthorized / Token expired" });
        return;
      }
      req.user = user as { id: number; email: string };
      next();
    });
  } else {
    res.status(401).json({ error: "Authorization header missing" });
  }
};
