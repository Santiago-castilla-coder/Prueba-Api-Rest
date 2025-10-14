import { sequelize } from "../config/database";

// Importar todos los modelos
import { User } from "./user.model";
import { Customer } from "./customer.model";
import { Address } from "./address.model";
import { Product } from "./product.model";
import { Warehouse } from "./warehouse.model";
import { Order } from "./order.model";
import { OrderProduct } from "./orderProduct.model";

// ============================
// 🔗 Relaciones entre modelos
// ============================

// Cliente → Direcciones (1:N)
Customer.hasMany(Address, { foreignKey: "customer_id" });
Address.belongsTo(Customer, { foreignKey: "customer_id" });

// Cliente → Órdenes (1:N)
Customer.hasMany(Order, { foreignKey: "customer_id" });
Order.belongsTo(Customer, { foreignKey: "customer_id", as: "customer" });

// Bodega → Órdenes (1:N)
Warehouse.hasMany(Order, { foreignKey: "warehouse_id" });
Order.belongsTo(Warehouse, { foreignKey: "warehouse_id", as: "warehouse" });

// Órdenes ↔ Productos (N:M) con tabla intermedia OrderProduct
Order.belongsToMany(Product, {
  through: OrderProduct,
  foreignKey: "order_id",
  otherKey: "product_id",
  as: "products",
});

Product.belongsToMany(Order, {
  through: OrderProduct,
  foreignKey: "product_id",
  otherKey: "order_id",
  as: "orders",
});

// ============================
// ⚙️ Function for initialize DB
// ============================
export const initModels = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión a la base de datos establecida");

    await sequelize.sync({ alter: true });
    console.log("🧩 Tablas y relaciones sincronizadas correctamente");
  } catch (error) {
    console.error("❌ Error al inicializar modelos:", error);
  }
};

// Export all model
export {
  User,
  Customer,
  Address,
  Product,
  Warehouse,
  Order,
  OrderProduct,
  sequelize,
};
