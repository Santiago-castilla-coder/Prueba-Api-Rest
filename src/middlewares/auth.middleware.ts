import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/token";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: "Token no proporcionado" });

  const token = header.split(" ")[1];
  const decoded: any = verifyToken(token);
  if (!decoded) return res.status(401).json({ message: "Token inválido" });

  (req as any).user = decoded;
  next();
};
