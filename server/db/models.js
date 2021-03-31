import sequelize_pkg from "sequelize";
import { sequelize } from "./sequelize.js";

const { DataTypes, Model } = sequelize_pkg;

export class User extends Model {}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);
