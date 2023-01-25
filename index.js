require("dotenv").config();

const express = require("express");
const cors = require("cors");
const SequelizeStore = require("connect-session-sequelize");
const { db } = require("./config/Database");
const { dbConnectMySQL } = require("./config/Database");
// const session = require("express-session");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const moviesRoutes = require("./routes/movies");
// const { genreModel } = require("./models"); Creacion de tabla

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

const PORT = process.env.PORT || 8080;
app.use(authRoutes);
app.use(usersRoutes);
app.use(moviesRoutes);
app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});

dbConnectMySQL();
