import { Request, Response } from "express";
import { Product } from "../models/product.model";

export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, stock } = req.body;
    if (!name || !price)
      return res.status(400).json({ message: "Missing required fields" });

    const product = await Product.create({ name, price, stock });
    res.status(201).json({ message: "Product created", product });
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
};
