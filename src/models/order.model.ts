import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

// Interface with all attributes
export interface OrderAttributes {
  id: number;
  status: string;
  customer_id: number;
  warehouse_id?: number | null;
}

// Interface for creation (id is optional)
export interface OrderCreationAttributes
  extends Optional<OrderAttributes, "id"> {}

// Model class
export class Order
  extends Model<OrderAttributes, OrderCreationAttributes>
  implements OrderAttributes
{
  public id!: number;
  public status!: string;
  public customer_id!: number;
  public warehouse_id?: number | null;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "pending",
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    warehouse_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "order",
    tableName: "orders",
    timestamps: false,
  }
);
