import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

// Interface with all attributes
export interface ProductAttributes {
  id: number;
  name: string;
  price: number;
}

// Interface for creation (id is optional)
export interface ProductCreationAttributes
  extends Optional<ProductAttributes, "id"> {}

// Model class
export class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  public id!: number;
  public name!: string;
  public price!: number;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "product",
    tableName: "products",
    timestamps: false,
  }
);
