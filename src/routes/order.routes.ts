import { Router } from "express";
import { getOrders, createOrder } from "../controllers/order.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order and delivery management
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders with related customer, warehouse, and products
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all orders
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 customer_id: 1
 *                 warehouse_id: 1
 *                 products:
 *                   - product_id: 1
 *                     quantity: 2
 */
router.get("/", getOrders);

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order with products
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             customer_id: 1
 *             warehouse_id: 1
 *             products:
 *               - product_id: 2
 *                 quantity: 3
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 10
 *               customer_id: 1
 *               warehouse_id: 1
 *               products:
 *                 - product_id: 2
 *                   quantity: 3
 */
router.post("/", createOrder);

export default router;
