import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

//  Interface with all attributes
export interface AddressAttributes {
  id: number;
  street: string;
  city: string;
  customer_id: number;
}

//  Interface for creation (id is optional because it's auto-incremented)
export interface AddressCreationAttributes
  extends Optional<AddressAttributes, "id"> {}

// 3 Model class
export class Address
  extends Model<AddressAttributes, AddressCreationAttributes>
  implements AddressAttributes
{
  public id!: number;
  public street!: string;
  public city!: string;
  public customer_id!: number;
}

Address.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    street: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "address",
    tableName: "addresses",
    timestamps: false,
  }
);
