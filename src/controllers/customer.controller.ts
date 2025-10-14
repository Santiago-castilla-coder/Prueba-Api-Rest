import { Request, Response } from "express";
import { Customer } from "../models/customer.model";
import { Address } from "../models/address.model";

// 📍 GET: List all customers with addresses
export const getCustomers = async (_req: Request, res: Response) => {
  try {
    const customers = await Customer.findAll({ include: [Address] });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching customers", error });
  }
};

// 📍 POST: Find a customer by document_id
export const getCustomerByDocument = async (req: Request, res: Response) => {
  try {
    const { document_id } = req.body;
    if (!document_id)
      return res.status(400).json({ message: "Missing document_id" });

    const customer = await Customer.findOne({
      where: { document_id },
      include: [Address],
    });

    if (!customer)
      return res.status(404).json({ message: "Customer not found" });

    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: "Error finding customer", error });
  }
};

// 📍 POST: Create a new customer with addresses
export const createCustomer = async (req: Request, res: Response) => {
  try {
    const { document_id, name, email, addresses } = req.body;

    if (!document_id || !name || !email)
      return res.status(400).json({ message: "Missing required fields" });

    const customer = await Customer.create({ document_id, name, email });

    if (Array.isArray(addresses)) {
      for (const a of addresses) {
        await Address.create({
          street: a.street,
          city: a.city,
          customer_id: customer.get("id"),
        });
      }
    }

    res.status(201).json({ message: "Customer created", customer });
  } catch (error) {
    res.status(500).json({ message: "Error creating customer", error });
  }
};
