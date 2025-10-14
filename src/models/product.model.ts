import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export class Product extends Model {
  public id!: number;
  public name!: string;
  public price!: number;
  public stock!: number;
}

Product.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(128), allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  },
  {
    sequelize,
    tableName: "products",
    freezeTableName: true,
    timestamps: true,
  }
);
