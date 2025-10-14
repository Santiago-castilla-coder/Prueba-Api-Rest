import { Router } from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  logicalDeleteProduct,
  updateProduct
} from "../controllers/product.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { checkRole } from "../middlewares/role.middleware";

const router = Router();

// Listar (admin + analyst)
router.get("/", authMiddleware, checkRole(["admin", "analyst"]), getProducts);

// Obtener por id/código (GET /products/:id)
router.get("/:id", authMiddleware, checkRole(["admin", "analyst"]), getProductById);

// Crear (admin)
router.post("/", authMiddleware, checkRole(["admin"]), createProduct);

// Actualizar (admin)
router.put("/:id", authMiddleware, checkRole(["admin"]), updateProduct);

// Eliminación lógica (PATCH es semántico para updates parciales)
router.patch("/:id", authMiddleware, checkRole(["admin"]), logicalDeleteProduct);

export default router;
