import { Router } from "express";
import { getWarehouses, createWarehouse } from "../controllers/warehouse.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { authorizeRole } from "../middlewares/role.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Warehouses
 *   description: Warehouse management
 */

/**
 * @swagger
 * /warehouses:
 *   get:
 *     summary: Get all warehouses (admin & analyst)
 *     tags: [Warehouses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of warehouses
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 name: "Central Warehouse"
 *                 location: "Bogotá"
 */
router.get("/", authMiddleware, authorizeRole(["admin", "analyst"]), getWarehouses);

/**
 * @swagger
 * /warehouses:
 *   post:
 *     summary: Create a new warehouse (admin only)
 *     tags: [Warehouses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "North Distribution Center"
 *             location: "Medellín"
 *     responses:
 *       201:
 *         description: Warehouse created successfully
 */
router.post("/", authMiddleware, authorizeRole(["admin"]), createWarehouse);

export default router;
