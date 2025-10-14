import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: "admin" | "analyst";
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(128), allowNull: false },
    email: { type: DataTypes.STRING(128), allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM("admin", "analyst"), allowNull: false },
  },
  {
    sequelize,
    tableName: "users",
    freezeTableName: true,
    timestamps: true,
  }
);
