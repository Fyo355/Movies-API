const { check } = require("express-validator");
const { validateResult } = require("../utils/handleValidator");

const validateLogin = [
  check("email").exists().notEmpty(),
  check("password").exists().notEmpty(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateCreate = [
  check("name").exists().notEmpty(),
  check("email").exists().notEmpty().isEmail(),
  check("password").exists().notEmpty().isLength({ min: 3, max: 15 }),
  check("role").exists().notEmpty(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateUpdate = [
  check("id").exists().isInt(),
  check("name").exists().notEmpty(),
  check("email").exists().notEmpty().isEmail(),
  check("password").exists().notEmpty().isLength({ min: 3, max: 15 }),
  check("role").exists().notEmpty(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateId = [
  check("id").exists().isInt(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validateCreate, validateLogin, validateUpdate, validateId };
