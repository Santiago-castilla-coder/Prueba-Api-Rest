import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export class Customer extends Model {
  public id!: number;
  public document_id!: string;
  public name!: string;
  public email!: string;
}

Customer.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    document_id: { type: DataTypes.STRING(20), allowNull: false, unique: true },
    name: { type: DataTypes.STRING(128), allowNull: false },
    email: { type: DataTypes.STRING(128), allowNull: false, unique: true },
  },
  {
    sequelize,
    tableName: "customers",
    freezeTableName: true,
    timestamps: true,
  }
);
