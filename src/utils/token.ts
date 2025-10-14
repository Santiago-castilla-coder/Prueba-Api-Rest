import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET = process.env.JWT_SECRET || "admin@123+";

/**
 * Genera un token JWT con una duración de 1 hora.
 * @param payload Datos del usuario (id, role, etc.)
 * @returns Token JWT firmado
 */
export const generateToken = (payload: object): string => {
  return jwt.sign(payload, SECRET, { expiresIn: "1h" });
};

/**
 * Verifica la validez de un token JWT.
 * @param token El token JWT recibido
 * @returns Datos del usuario si es válido, o null si no lo es
 */
export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
};
