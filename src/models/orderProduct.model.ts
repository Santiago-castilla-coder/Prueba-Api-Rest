import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export class OrderProduct extends Model {
  public order_id!: number;
  public product_id!: number;
  public quantity!: number;
}

OrderProduct.init(
  {
    order_id: { type: DataTypes.INTEGER, primaryKey: true },
    product_id: { type: DataTypes.INTEGER, primaryKey: true },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, tableName: "order_products", freezeTableName: true, timestamps: false }
);
