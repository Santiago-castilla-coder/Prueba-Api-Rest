import { Router } from "express";
import { getUsers } from "../controllers/user.controller";

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
 *     summary: Get all users
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
router.get("/", getUsers);

export default router;
