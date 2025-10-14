import { Router } from "express";
import {
  getCustomers,
  getCustomerByDocument,
  createCustomer
} from "../controllers/customer.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { checkRole } from "../middlewares/role.middleware";
import { uniqueCustomerDocument } from "../middlewares/customer.middleware";

const router = Router();

// Listar todos (admin + analyst)
router.get("/", authMiddleware, checkRole(["admin", "analyst"]), getCustomers);

// Buscar cliente por cédula (POST según el enunciado)
router.post("/search", authMiddleware, checkRole(["admin", "analyst"]), getCustomerByDocument);

// Crear cliente (solo admin) - valida duplicado
router.post("/", authMiddleware, checkRole(["admin"]), uniqueCustomerDocument, createCustomer);

export default router;
