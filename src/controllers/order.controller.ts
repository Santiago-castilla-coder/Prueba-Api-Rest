import { Request, Response } from "express";
import { Order } from "../models/order.model";
import { OrderProduct } from "../models/orderProduct.model";
import { Product } from "../models/product.model";
import { Warehouse } from "../models/warehouse.model";
import { Customer } from "../models/customer.model";
import { sequelize } from "../config/database";

export const createOrder = async (req: Request, res: Response) => {
  const t = await sequelize.transaction();
  try {
    const { customer_id, warehouse_id, products } = req.body;

    // Validar datos básicos
    if (!customer_id || !products || !Array.isArray(products) || products.length === 0) {
      await t.rollback();
      return res.status(400).json({ message: "Datos incompletos para crear la orden" });
    }

    const customer = await Customer.findByPk(customer_id);
    if (!customer) {
      await t.rollback();
      return res.status(404).json({ message: "Cliente no existe" });
    }

    const warehouse = await Warehouse.findByPk(warehouse_id);
    if (!warehouse) {
      await t.rollback();
      return res.status(404).json({ message: "Bodega no existe" });
    }

    // Crear orden con estado inicial 'pending'
    const order = await Order.create({ customer_id, warehouse_id, status: "pending" }, { transaction: t });

    // Recorrer productos
    for (const p of products) {
      const product = await Product.findByPk(p.product_id);

      if (!product) {
        await t.rollback();
        return res.status(404).json({ message: `Producto ${p.product_id} no existe` });
      }

      const stock = (product as any).get("stock"); // ✅ evitar error TS
      if (stock < p.quantity) {
        await t.rollback();
        return res.status(400).json({ message: `Stock insuficiente para producto ${p.product_id}` });
      }

      // Actualizar stock
      await product.update(
        { stock: stock - p.quantity },
        { transaction: t }
      );

      // Crear relación producto-orden
      await OrderProduct.create(
        {
          order_id: (order as any).get("id"), // ✅ evitar error TS
          product_id: (product as any).get("id"),
          quantity: p.quantity,
        },
        { transaction: t }
      );
    }

    await t.commit();
    res.status(201).json({ message: "Orden creada correctamente", order_id: (order as any).get("id") });
  } catch (error) {
    await t.rollback();
    console.error("❌ Error creando orden:", error);
    res.status(500).json({ message: "Error creando orden", error });
  }
};

// 📦 Listar todas las órdenes con cliente y bodega
export const getOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await Order.findAll({
      include: [Customer, Warehouse],
      order: [["createdAt", "DESC"]],
    });
    res.json(orders);
  } catch (error) {
    console.error("❌ Error listando órdenes:", error);
    res.status(500).json({ message: "Error listando órdenes", error });
  }
};

// 🚚 Cambiar estado de una orden
export const changeOrderStatus = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;
    const validStatuses = ["pending", "in_transit", "delivered", "entregado", "en tránsito"];

    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ message: "Estado inválido" });
    }

    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ message: "Orden no encontrada" });

    await order.update({ status });
    res.json({ message: "Estado actualizado correctamente", order });
  } catch (error) {
    console.error("❌ Error actualizando estado:", error);
    res.status(500).json({ message: "Error actualizando estado", error });
  }
};

// 📜 Historial de órdenes de un cliente
export const getOrderHistoryByCustomer = async (req: Request, res: Response) => {
  try {
    const customer_id = Number(req.params.customer_id);

    const history = await Order.findAll({
      where: { customer_id },
      include: [
        Customer,
        Warehouse,
        {
          model: Product,
          through: { attributes: ["quantity"] }, // muestra la cantidad del pivot
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json(history);
  } catch (error) {
    console.error("❌ Error obteniendo historial:", error);
    res.status(500).json({ message: "Error obteniendo historial", error });
  }
};
