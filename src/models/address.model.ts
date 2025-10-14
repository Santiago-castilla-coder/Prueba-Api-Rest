import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export class Address extends Model {
  public id!: number;
  public street!: string;
  public city!: string;
  public customer_id!: number;
}

Address.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    street: { type: DataTypes.STRING(128), allowNull: false },
    city: { type: DataTypes.STRING(128), allowNull: false },
    customer_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    tableName: "addresses",
    freezeTableName: true,
    timestamps: true,
  }
);
