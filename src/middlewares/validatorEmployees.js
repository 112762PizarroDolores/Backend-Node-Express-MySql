const { check } = require("express-validator");
const { validateResult } = require("./validator");
const validateCreateEmployee = [
  check("first_name").exists().notEmpty(),
  check("last_name").exists().notEmpty(),
  check("cuit")
    .exists()
    .notEmpty()
    .isLength({ min: 11, max: 13 })
    .withMessage("This is a not valid cuit, review the length"),
  check("team_id").exists().notEmpty().isNumeric(),
  check("join_date").exists().notEmpty().isDate(),
  check("rol").exists().notEmpty(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
const validateUpdateEmployee = [
  // check("id_employee").optional().notEmpty(),
  check("first_name").optional().notEmpty(),
  check("last_name").optional().notEmpty(),
  check("cuit")
    .optional()
    .notEmpty()
    .isLength({ min: 11, max: 13 })
    .withMessage("This is a not valid cuit, review the length"),
  check("team_id").optional().notEmpty(),
  check("join_date").optional().notEmpty().isDate(),
  check("rol").optional().notEmpty(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateIdEmployee = [
  check("id_employee").exists().isNumeric(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = {
  validateCreateEmployee,
  validateUpdateEmployee,
  validateIdEmployee,
};
