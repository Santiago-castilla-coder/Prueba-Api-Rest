import { Request, Response } from "express";
import { Customer } from "../models/customer.model";
import { Address } from "../models/address.model";

// 📍 GET: Listar todos los clientes con sus direcciones
export const getCustomers = async (_req: Request, res: Response) => {
  try {
    const customers = await Customer.findAll({ include: [Address] });
    res.json(customers);
  } catch (error) {
    console.error("❌ Error al listar clientes:", error);
    res.status(500).json({ message: "Error al listar clientes", error });
  }
};

// 📍 POST: Buscar cliente por document_id
export const getCustomerByDocument = async (req: Request, res: Response) => {
  try {
    const { document_id } = req.body;
    if (!document_id) {
      return res.status(400).json({ message: "Falta document_id" });
    }

    const customer = await Customer.findOne({
      where: { document_id },
      include: [Address],
    });

    if (!customer) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    res.json(customer);
  } catch (error) {
    console.error("❌ Error en búsqueda de cliente:", error);
    res.status(500).json({ message: "Error en búsqueda de cliente", error });
  }
};

// 📍 POST: Crear cliente con direcciones
export const createCustomer = async (req: Request, res: Response) => {
  try {
    const { document_id, name, email, addresses } = req.body;

    // Validación básica
    if (!document_id || !name || !email) {
      return res.status(400).json({ message: "Faltan datos requeridos" });
    }

    // Crear cliente
    const customer = await Customer.create({ document_id, name, email });

    // Crear direcciones si existen
    if (Array.isArray(addresses)) {
      for (const a of addresses) {
        await Address.create({
          street: a.street,
          city: a.city,
          customer_id: customer.get("id"), // ✅ Evita el error de TypeScript
        });
      }
    }

    res.status(201).json({
      message: "Cliente creado correctamente",
      customer,
    });
  } catch (error) {
    console.error("❌ Error creando cliente:", error);
    res.status(500).json({ message: "Error creando cliente", error });
  }
};
