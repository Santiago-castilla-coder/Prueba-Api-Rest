import { sequelize } from "../config/database";
import { User } from "./user.model";
import { Customer } from "./customer.model";
import { Address } from "./address.model";
import { Product } from "./product.model";
import { Warehouse } from "./warehouse.model";
import { Order } from "./order.model";
import { OrderProduct } from "./orderProduct.model";

// Asociaciones
Customer.hasMany(Address, { foreignKey: "customer_id" });
Address.belongsTo(Customer, { foreignKey: "customer_id" });

Customer.hasMany(Order, { foreignKey: "customer_id" });
Order.belongsTo(Customer, { foreignKey: "customer_id", as: "customer" });

Warehouse.hasMany(Order, { foreignKey: "warehouse_id" });
Order.belongsTo(Warehouse, { foreignKey: "warehouse_id", as: "warehouse" });

Order.belongsToMany(Product, { through: OrderProduct, foreignKey: "order_id", otherKey: "product_id", as: "products" });
Product.belongsToMany(Order, { through: OrderProduct, foreignKey: "product_id", otherKey: "order_id", as: "orders" });

export { sequelize, User, Customer, Address, Product, Warehouse, Order, OrderProduct };
