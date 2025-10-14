import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class Warehouse extends Model {
  public id!: number;
  public name!: string;
  public location!: string;
}

Warehouse.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(128), allowNull: false },
    location: { type: DataTypes.STRING(128), allowNull: false },
  },
  { sequelize, modelName: "warehouse", tableName: "warehouses", timestamps: false }
);
