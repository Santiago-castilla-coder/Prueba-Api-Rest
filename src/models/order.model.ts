import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class Order extends Model {
  public id!: number;
  public status!: string;
  public customer_id!: number;
  public warehouse_id!: number;
}

Order.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    status: { type: DataTypes.STRING(20), allowNull: false, defaultValue: "pending" },
    customer_id: { type: DataTypes.INTEGER, allowNull: false },
    warehouse_id: { type: DataTypes.INTEGER, allowNull: true },
  },
  { sequelize, modelName: "order", tableName: "orders", timestamps: false }
);
