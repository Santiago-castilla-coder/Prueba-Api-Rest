import { sequelize } from "../config/database";

// Import all models
import { User } from "./user.model";
import { Customer } from "./customer.model";
import { Address } from "./address.model";
import { Product } from "./product.model";
import { Warehouse } from "./warehouse.model";
import { Order } from "./order.model";
import { OrderProduct } from "./orderProduct.model";

// ============================
// 🔗 Model Relationships
// ============================

// Customer → Addresses (1:N)
Customer.hasMany(Address, { foreignKey: "customer_id" });
Address.belongsTo(Customer, { foreignKey: "customer_id" });

// Customer → Orders (1:N)
Customer.hasMany(Order, { foreignKey: "customer_id" });
Order.belongsTo(Customer, { foreignKey: "customer_id", as: "customer" });

// Warehouse → Orders (1:N)
Warehouse.hasMany(Order, { foreignKey: "warehouse_id" });
Order.belongsTo(Warehouse, { foreignKey: "warehouse_id", as: "warehouse" });

// Orders ↔ Products (N:M) through OrderProduct
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
// ⚙️ Function to initialize DB
// ============================
export const initModels = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established");

    await sequelize.sync({ alter: true });
    console.log("🧩 Tables and relationships synchronized successfully");
  } catch (error) {
    console.error("❌ Error initializing models:", error);
  }
};

// Export all models
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
