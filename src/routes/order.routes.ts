import { Router } from "express";
import {
  createOrder,
  getOrders,
  getOrderHistoryByCustomer,
  changeOrderStatus
} from "../controllers/order.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { checkRole } from "../middlewares/role.middleware";
import { checkStockForOrder } from "../middlewares/order.middleware";

const router = Router();

// Listar todas (admin + analyst)
router.get("/", authMiddleware, checkRole(["admin", "analyst"]), getOrders);

// Crear orden (solo admin) — middleware valida stock
router.post("/", authMiddleware, checkRole(["admin"]), checkStockForOrder, createOrder);

// Cambiar estado (admin + analyst — analyst solo puede actualizar estado)
router.patch("/:id/status", authMiddleware, checkRole(["admin", "analyst"]), changeOrderStatus);

// Historial por cliente (consultar todas las órdenes de un cliente)
router.get("/history/:customer_id", authMiddleware, checkRole(["admin", "analyst"]), getOrderHistoryByCustomer);

export default router;
