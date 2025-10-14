import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

// Interface with all attributes
export interface WarehouseAttributes {
  id: number;
  name: string;
  location: string;
}

// Interface for creation (id is optional)
export interface WarehouseCreationAttributes
  extends Optional<WarehouseAttributes, "id"> {}

// Model class
export class Warehouse
  extends Model<WarehouseAttributes, WarehouseCreationAttributes>
  implements WarehouseAttributes
{
  public id!: number;
  public name!: string;
  public location!: string;
}

Warehouse.init(
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
    location: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "warehouse",
    tableName: "warehouses",
    timestamps: false,
  }
);
