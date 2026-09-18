import type { Request, Response, NextFunction } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';

declare module 'express' {
  interface Request {
    userId?: string;
  }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    req.userId = userId;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
