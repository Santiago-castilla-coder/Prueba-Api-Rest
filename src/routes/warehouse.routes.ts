import { Router } from "express";
import {
  getWarehouses,
  toggleWarehouseActive,
  getActiveWarehousesWithStock
} from "../controllers/warehouse.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { checkRole } from "../middlewares/role.middleware";

const router = Router();

// Listar todas (admin + analyst)
router.get("/", authMiddleware, checkRole(["admin", "analyst"]), getWarehouses);

// Activar/Inactivar una bodega (admin)
router.patch("/:id/toggle", authMiddleware, checkRole(["admin"]), toggleWarehouseActive);

// Listar bodegas activas con stock
router.get("/active/with-stock", authMiddleware, checkRole(["admin", "analyst"]), getActiveWarehousesWithStock);

export default router;
