import { Request, Response } from "express";
import { Warehouse } from "../models/warehouse.model";
import { Product } from "../models/product.model";
import { sequelize } from "../config/database";

// Asumimos que tienes tabla warehouse_products para stock por bodega; si no, adaptar.
export const getWarehouses = async (_req: Request, res: Response) => {
  try {
    const w = await Warehouse.findAll();
    res.json(w);
  } catch (error) {
    res.status(500).json({ message: "Error listando bodegas", error });
  }
};

export const toggleWarehouseActive = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const warehouse = await Warehouse.findByPk(id);
    if (!warehouse) return res.status(404).json({ message: "Bodega no encontrada" });

    const newVal = !(warehouse as any).active;
    await warehouse.update({ active: newVal });
    res.json({ message: `Bodega ${newVal ? "activada" : "inactivada"}` });
  } catch (error) {
    res.status(500).json({ message: "Error al cambiar estado de bodega", error });
  }
};

export const getActiveWarehousesWithStock = async (_req: Request, res: Response) => {
  try {
    // Si tienes relación warehouse_products, úsala. Ejemplo con raw query:
    const results = await sequelize.query(`
      SELECT w.id, w.name, w.location, wp.product_id, wp.stock
      FROM warehouses w
      JOIN warehouse_products wp ON w.id = wp.warehouse_id
      WHERE w.active = true AND wp.stock > 0
    `, { type: (sequelize as any).QueryTypes.SELECT });

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: "Error listando bodegas activas con stock", error });
  }
};
