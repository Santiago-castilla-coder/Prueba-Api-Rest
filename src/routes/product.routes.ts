import { Router } from "express";
import { getProducts, createProduct } from "../controllers/product.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { authorizeRole } from "../middlewares/role.middleware"; // Middleware de rol

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 name: "Laptop"
 *                 price: 1200.5
 *                 stock: 10
 */
router.get("/", authMiddleware, authorizeRole(["admin", "analyst"]), getProducts);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "Tablet"
 *             price: 650
 *             stock: 50
 *     responses:
 *       201:
 *         description: Product created successfully
 */
router.post("/", authMiddleware, authorizeRole(["admin"]), createProduct);

export default router;
