import { Router } from "express";
import { getUsers } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { authorizeRole } from "../middlewares/role.middleware"; // Middleware de roles

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 username: "admin"
 *                 name: "Administrator"
 *                 email: "admin@example.com"
 *                 role: "admin"
 */
router.get("/", authMiddleware, authorizeRole(["admin"]), getUsers);

export default router;
