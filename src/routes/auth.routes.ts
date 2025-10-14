import { Router } from "express";
import { register, login } from "../controllers/auth.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and user registration
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             username: "admin"
 *             name: "Administrator"
 *             email: "admin@example.com"
 *             password: "1234"
 *             role: "admin"
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               username: "admin"
 *               name: "Administrator"
 *               email: "admin@example.com"
 *               role: "admin"
 *       400:
 *         description: Missing required fields
 *       409:
 *         description: User already exists
 */
router.post("/register", register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             username: "admin"
 *             password: "1234"
 *     responses:
 *       200:
 *         description: Successful login, returns JWT token
 *         content:
 *           application/json:
 *             example:
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *               user:
 *                 id: 1
 *                 username: "admin"
 *                 name: "Administrator"
 *                 email: "admin@example.com"
 *                 role: "admin"
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", login);

export default router;
