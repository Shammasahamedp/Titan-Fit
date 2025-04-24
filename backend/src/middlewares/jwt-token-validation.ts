
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface TokenPayload extends JwtPayload {
  id: string;
  role: 'user' | 'trainer' | 'admin'; 
}

export const jwtTokenVerify = (allowedRoles: string[] = []) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
         res.status(401).json({ success: false, message: 'Invalid JWT token' });
         return
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;

      if (allowedRoles.length && !allowedRoles.includes(decoded.role)) {
         res.status(403).json({ success: false, message: 'Forbidden: Access denied' });
         return
      }

      res.locals.user = decoded;
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ success: false, message: 'Invalid JWT token' });
    }
  };
};
