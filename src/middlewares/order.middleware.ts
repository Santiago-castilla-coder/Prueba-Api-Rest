import { Request, Response, NextFunction } from "express";
import { Product } from "../models/product.model";
import { sequelize } from "../config/database";

export const checkStockForOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { products } = req.body;
    if (!Array.isArray(products) || products.length === 0) return res.status(400).json({ message: "Productos inválidos" });

    for (const p of products) {
      const product = await Product.findByPk(p.product_id);
      if (!product) return res.status(404).json({ message: `Producto ${p.product_id} no existe` });
      if ((product as any).stock < p.quantity) return res.status(400).json({ message: `Stock insuficiente para producto ${p.product_id}` });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Error validando stock", error });
  }
};
