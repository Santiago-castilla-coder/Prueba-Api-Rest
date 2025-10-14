import { Request, Response } from "express";
import { Order } from "../models/order.model";
import { Product } from "../models/product.model";
import { OrderProduct } from "../models/orderProduct.model";
import { Customer } from "../models/customer.model";
import { Warehouse } from "../models/warehouse.model";

export const getOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await Order.findAll({
      include: [
        { model: Customer, as: "customer" },
        { model: Warehouse, as: "warehouse" },
        { model: Product, as: "products" },
      ],
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { customer_id, warehouse_id, products } = req.body;
    if (!customer_id || !warehouse_id)
      return res.status(400).json({ message: "Missing required fields" });

    const order = await Order.create({ customer_id, warehouse_id, status: "pending" });

    if (Array.isArray(products)) {
      for (const p of products) {
        await OrderProduct.create({
          order_id: order.get("id"),
          product_id: p.product_id,
          quantity: p.quantity || 1,
        });
      }
    }

    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error });
  }
};
