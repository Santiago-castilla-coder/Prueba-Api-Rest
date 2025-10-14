import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model";
import { generateToken } from "../utils/token";
// 🔐 Registrar usuario
export const register = async (req: Request, res: Response) => {
  try {
    const { username, name, email, password, role } = req.body;

    // Validar campos
    if (!username || !name || !email || !password || !role)
      return res.status(400).json({ message: "Faltan datos" });

    // Verificar duplicado
    const exists = await User.findOne({ where: { username } });
    if (exists) return res.status(409).json({ message: "Usuario ya existe" });

    // Encriptar contraseña
    const hashed = await bcrypt.hash(password, 10);

    // Crear usuario
    const user = await User.create({
      username,
      name,
      email,
      password: hashed,
      role,
    });

    // Responder (sin contraseña)
    res.status(201).json({
      id: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error("❌ Error al registrar usuario:", error);
    res.status(500).json({ message: "Error al registrar usuario" });
  }
};

// 🔑 Login de usuario
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: "Faltan datos" });

    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return res.status(401).json({ message: "Contraseña incorrecta" });

    // Crear token JWT (si tienes utils/token)
    const token = generateToken({ id: user.id, role: user.role });

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("❌ Error en login:", error);
    res.status(500).json({ message: "Error en login" });
  }
};
