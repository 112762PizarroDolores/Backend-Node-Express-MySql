const { check } = require("express-validator");
const { validateResult } = require("./validator");
const validateCreateEmployee = [
  check("first_name").exists().notEmpty(),
  check("last_name").exists().notEmpty(),
  check("cuit").exists().notEmpty(),
  check("team_id").exists().notEmpty(),
  check("join_date").exists().notEmpty(),
  check("rol").exists().notEmpty(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
const validateUpdateEmployee = [
  check("id_employee").exists().notEmpty(),
  check("first_name").exists().notEmpty(),
  check("last_name").exists().notEmpty(),
  check("cuit").exists().notEmpty(),
  check("team_id").exists().notEmpty(),
  check("join_date").exists().notEmpty(),
  check("rol").exists().notEmpty(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateIdEmployee = [
  check("id_employee").exists(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = {
  validateCreateEmployee,
  validateUpdateEmployee,
  validateIdEmployee,
};
