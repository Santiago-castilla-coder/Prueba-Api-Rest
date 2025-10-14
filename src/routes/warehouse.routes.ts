import { Router } from "express";
import { getWarehouses, createWarehouse } from "../controllers/warehouse.controller";

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
 *     summary: Get all warehouses
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
router.get("/", getWarehouses);

/**
 * @swagger
 * /warehouses:
 *   post:
 *     summary: Create a new warehouse
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
router.post("/", createWarehouse);

export default router;
