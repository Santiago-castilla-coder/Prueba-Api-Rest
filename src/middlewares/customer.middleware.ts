import { Request, Response, NextFunction } from "express";
import { Customer } from "../models/customer.model";

// 🔹 Middleware para validar que no se registren clientes duplicados
export const uniqueCustomerDocument = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { document_id } = req.body;

    if (!document_id) {
      return res.status(400).json({ message: "Falta document_id" });
    }

    const existing = await Customer.findOne({ where: { document_id } });
    if (existing) {
      return res.status(409).json({ message: "Ya existe un cliente con ese documento" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Error validando cliente duplicado", error });
  }
};
