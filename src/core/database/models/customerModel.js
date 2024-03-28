import sequelize from "sequelize";
const { Model, DataTypes } = sequelize;
import { connection } from "../connection.js";

class customer extends Model { }

customer.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: true,
    },
    profilePic: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    userName: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    fullName: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    dob: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    gender: {
      type: DataTypes.ENUM("male", "female", "others"),
      allowNull: true,
      defaultValue: "male",
    },

    status: {
      type: DataTypes.ENUM("active", "inactive", "terminated"),
      allowNull: true,
      defaultValue: "active",
    },
  },
  { sequelize: connection, freezeTableName: true }
);

class shippingAddress extends Model { }

shippingAddress.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    customerId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    district: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    landmark: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "null"
    },
    zipcode: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    addressType: {
      type: DataTypes.ENUM("home", "office", "other"),
      allowNull: false,
    },
    primary: {
      type: DataTypes.ENUM("yes", "no"),
      allowNull: false,
      defaultValue: "yes",
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      allowNull: false,
      defaultValue: "active",
    },
  },
  { sequelize: connection, freezeTableName: true }
);

class customerAuthentication extends Model { }

customerAuthentication.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ipv4: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userAgent: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { sequelize: connection, freezeTableName: true }
);
export { customer, shippingAddress, customerAuthentication };
