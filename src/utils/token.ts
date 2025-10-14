import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET = process.env.JWT_SECRET || "admin@123+";

/**
 * Generate a JWT token valid for 1 hour.
 * @param payload User data (id, role, etc.)
 * @returns Signed JWT token
 */
export const generateToken = (payload: Record<string, any>): string => {
  return jwt.sign(payload, SECRET, { expiresIn: "1h" });
};

/**
 * Verify the validity of a JWT token.
 * @param token The received JWT token
 * @returns Decoded user data if valid, or null if invalid
 */
export const verifyToken = (token: string): JwtPayload | string | null => {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
};
