const express = require("express");
const { Login } = require("../controllers/auth.js");
const { validateLogin } = require("../validators/users");

const router = express.Router();

router.post("/", validateLogin, Login);

module.exports = router;
