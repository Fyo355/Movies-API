const { Sequelize } = require("sequelize");

const db = new Sequelize("auth_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

const dbConnectMySQL = async () => {
  try {
    await db.authenticate();
    console.log("MySQL connected");
  } catch (e) {
    console.log("MySQL ERROR connected", e);
  }
};

module.exports = { db, dbConnectMySQL };
