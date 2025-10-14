import { Request, Response } from "express";
import { Product } from "../models/product.model";

export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos", error });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const p = await Product.findByPk(id);
    if (!p) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(p);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar producto", error });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, stock = 0, active = true } = req.body;
    const product = await Product.create({ name, price, stock, active });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error creando producto", error });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });

    await product.update(req.body);
    res.json({ message: "Producto actualizado", product });
  } catch (error) {
    res.status(500).json({ message: "Error actualizando producto", error });
  }
};

export const logicalDeleteProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });

    await product.update({ active: false });
    res.json({ message: "Producto eliminado (lógico)" });
  } catch (error) {
    res.status(500).json({ message: "Error eliminando producto", error });
  }
};
