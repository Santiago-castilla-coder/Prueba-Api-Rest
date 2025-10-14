import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

// Interface with all attributes
export interface OrderProductAttributes {
  order_id: number;
  product_id: number;
  quantity: number;
}

// Interface for creation (no optional fields)
export interface OrderProductCreationAttributes
  extends Optional<OrderProductAttributes, never> {}

// Model class
export class OrderProduct
  extends Model<OrderProductAttributes, OrderProductCreationAttributes>
  implements OrderProductAttributes
{
  public order_id!: number;
  public product_id!: number;
  public quantity!: number;
}

OrderProduct.init(
  {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "order_product",
    tableName: "order_products",
    timestamps: false,
  }
);
