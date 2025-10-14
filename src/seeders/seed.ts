import fs from "fs";
import path from "path";
import csv from "csv-parser";
import bcrypt from "bcryptjs";
import { sequelize } from "../config/database";
import { User } from "../models/user.model";
import { Customer } from "../models/customer.model";
import { Warehouse } from "../models/warehouse.model";
import { Product } from "../models/product.model";

// Función genérica para leer CSV
const readCSV = async (filePath: string): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const results: any[] = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", reject);
  });
};

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("🔄 Tablas sincronizadas");

    // 🧑‍💻 1. Usuarios
    const users = await readCSV(path.join(__dirname, "../data/users.csv"));

  for (const u of users) {
    const hashedPassword = await bcrypt.hash(u.password, 10);
    await User.create({
      name: u.name,      // debe coincidir con la cabecera exacta
      email: u.email,    // debe coincidir con la cabecera exacta
      password: hashedPassword,
      role: u.role,
    });
}


    console.log("✅ Usuarios cargados");

    // 👥 2. Clientes
    const customers = await readCSV(path.join(__dirname, "../data/customers.csv"));
    for (const c of customers) {
      await Customer.create({
        document_id: c.document_id,
        name: c.name,
        email: c.email,
      });
    }
    console.log("✅ Clientes cargados");

    // 🏭 3. Bodegas
    const warehouses = await readCSV(path.join(__dirname, "../data/warehouses.csv"));
    for (const w of warehouses) {
      await Warehouse.create({
        name: w.name,
        location: w.location,
        active: w.active === "true",
      });
    }
    console.log("✅ Bodegas cargadas");

    // 📦 4. Productos
    const products = await readCSV(path.join(__dirname, "../data/products.csv"));
    for (const p of products) {
      await Product.create({
        name: p.name,
        price: parseFloat(p.price),
        stock: parseInt(p.stock),
        active: p.active === "true",
      });
    }
    console.log("✅ Productos cargados");

    console.log("🎉 Seeder completado con éxito");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error al ejecutar seeders:", error);
    process.exit(1);
  }
};

seedDatabase();
