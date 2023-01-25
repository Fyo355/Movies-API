const { db } = require("../config/Database");
const { DataTypes } = require("sequelize");

const Users = db.define(
  "users",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM(["normal", "admin", "business"]),
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Users;
