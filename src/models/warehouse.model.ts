import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export class Warehouse extends Model {
  public id!: number;
  public name!: string;
  public location!: string;
}

Warehouse.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(128), allowNull: false },
    location: { type: DataTypes.STRING(128), allowNull: false },
  },
  {
    sequelize,
    tableName: "warehouses",
    freezeTableName: true,
    timestamps: true,
  }
);
