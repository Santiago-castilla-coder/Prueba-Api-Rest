import { Router } from "express";
import {
  getCustomers,
  getCustomerByDocument,
  createCustomer,
} from "../controllers/customer.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: Customer and address management
 */

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Get all customers with their addresses
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of customers
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 document_id: "123456789"
 *                 name: "John Doe"
 *                 email: "john@example.com"
 *                 addresses:
 *                   - street: "Main St 123"
 *                     city: "Springfield"
 */
router.get("/", getCustomers);

/**
 * @swagger
 * /customers/find:
 *   post:
 *     summary: Find a customer by document ID
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             document_id: "123456789"
 *     responses:
 *       200:
 *         description: Customer found
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               name: "John Doe"
 *               email: "john@example.com"
 *       404:
 *         description: Customer not found
 */
router.post("/find", getCustomerByDocument);

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Create a new customer with addresses
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             document_id: "987654321"
 *             name: "Jane Doe"
 *             email: "jane@example.com"
 *             addresses:
 *               - street: "Oak St 45"
 *                 city: "Shelbyville"
 *     responses:
 *       201:
 *         description: Customer created successfully
 */
router.post("/", createCustomer);

export default router;
