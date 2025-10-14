import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

// Interface with all attributes
export interface CustomerAttributes {
  id: number;
  document_id: string;
  name: string;
  email: string;
}

// Interface for creation (id is optional)
export interface CustomerCreationAttributes
  extends Optional<CustomerAttributes, "id"> {}

// Model class
export class Customer
  extends Model<CustomerAttributes, CustomerCreationAttributes>
  implements CustomerAttributes
{
  public id!: number;
  public document_id!: string;
  public name!: string;
  public email!: string;
}

Customer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    document_id: {
      type: DataTypes.STRING(20),
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(128),
      unique: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "customer",
    tableName: "customers",
    timestamps: false,
  }
);
