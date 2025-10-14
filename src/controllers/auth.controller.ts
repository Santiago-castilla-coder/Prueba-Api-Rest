import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model";
import { generateToken } from "../utils/token";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, role } = req.body;
    if (!username || !password || !role) return res.status(400).json({ message: "Faltan datos" });

    const exists = await User.findOne({ where: { username } });
    if (exists) return res.status(409).json({ message: "Usuario ya existe" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashed, role });
    res.status(201).json({ id: user.id, username: user.username, role: user.role });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar usuario", error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: "Faltan datos" });

    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Contraseña incorrecta" });

    const token = generateToken({ id: user.id, role: user.role });
    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: "Error en login", error });
  }
};
