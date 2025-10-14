import { Router } from "express";
import { login, register } from "../controllers/auth.controller";

const router = Router();

// Registro (admin o analyst pueden ser creados por seed; también permitimos registro)
router.post("/register", register);

// Login
router.post("/login", login);

export default router;
