const { db } = require("../config/Database");
const { DataTypes } = require("sequelize");

const Genre = db.define("genre", {
  name: { type: DataTypes.STRING, allowNull: false },
});

// Genre.sync(); Creacion de tabla

module.exports = Genre;
