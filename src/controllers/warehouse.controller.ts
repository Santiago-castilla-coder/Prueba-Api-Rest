import { Request, Response } from "express";
import { Warehouse } from "../models/warehouse.model";

export const getWarehouses = async (_req: Request, res: Response) => {
  try {
    const warehouses = await Warehouse.findAll();
    res.json(warehouses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching warehouses", error });
  }
};

export const createWarehouse = async (req: Request, res: Response) => {
  try {
    const { name, location } = req.body;
    if (!name)
      return res.status(400).json({ message: "Missing warehouse name" });

    const warehouse = await Warehouse.create({ name, location });
    res.status(201).json({ message: "Warehouse created", warehouse });
  } catch (error) {
    res.status(500).json({ message: "Error creating warehouse", error });
  }
};
