import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class Product extends Model {
  public id!: number;
  public name!: string;
  public price!: number;
}

Product.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(128), allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  },
  { sequelize, modelName: "product", tableName: "products", timestamps: false }
);
