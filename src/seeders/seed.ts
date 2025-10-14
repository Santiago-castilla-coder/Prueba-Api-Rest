import fs from "fs";
import path from "path";
import csv from "csv-parser";
import bcrypt from "bcryptjs"; // 👈 added for password hashing
import { sequelize } from "../config/database";
import { User } from "../models/user.model";
import { Customer } from "../models/customer.model";
import { Address } from "../models/address.model";
import { Warehouse } from "../models/warehouse.model";
import { Product } from "../models/product.model";
import { Order } from "../models/order.model";
import { OrderProduct } from "../models/orderProduct.model";

const loadCSV = (file: string) => {
  const filePath = path.resolve("src/data", file);
  const data: any[] = [];
  return new Promise<any[]>((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => data.push(row))
      .on("end", () => resolve(data))
      .on("error", reject);
  });
};

export const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("🧹 Tables recreated successfully");

    // Load CSV files
    const users = await loadCSV("users.csv");
    const customers = await loadCSV("customers.csv");
    const addresses = await loadCSV("addresses.csv");
    const warehouses = await loadCSV("warehouses.csv");
    const products = await loadCSV("products.csv");
    const orders = await loadCSV("orders.csv");
    const orderProducts = await loadCSV("order_products.csv");

    // 🔐 Hash user passwords before inserting
    for (const user of users) {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 10);
      }
    }

    // Insert data in correct order
    await User.bulkCreate(users);
    await Customer.bulkCreate(customers);
    await Address.bulkCreate(addresses);
    await Warehouse.bulkCreate(warehouses);
    await Product.bulkCreate(products);
    await Order.bulkCreate(orders);
    await OrderProduct.bulkCreate(orderProducts);

    console.log("✅ Data inserted successfully into all tables");
  } catch (error) {
    console.error("❌ Error running seed:", error);
  } finally {
    await sequelize.close();
    console.log("🔒 Database connection closed");
  }
};

seedDatabase();
