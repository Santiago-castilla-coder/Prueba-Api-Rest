import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/token";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const header = (req.headers.authorization || "") as string;
  const token = header.startsWith("Bearer ") ? header.slice(7) : header;
  if (!token) return res.status(401).json({ message: "No token provided" });

  const payload = verifyToken(token);
  if (!payload) return res.status(401).json({ message: "Invalid token" });

  (req as any).user = payload;
  next();
};
