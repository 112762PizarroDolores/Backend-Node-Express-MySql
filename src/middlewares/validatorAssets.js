const { check } = require("express-validator");
const { validateResult } = require("./validator");
const validateCreateAsset = [
  check("name").exists().notEmpty(),
  check("type").exists().notEmpty(),
  check("code").exists().notEmpty(),
  check("marca").exists().notEmpty(),
  check("description").exists().notEmpty(),
  check("purchase_date").exists().notEmpty().isISO8601().withMessage("purchase date, cannot be empty. Format has to be YYYY-MM-DD"),
  check("id_employee").exists().notEmpty(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
const validateUpdateAsset = [
  check("name").optional().notEmpty(),
  check("type").optional().notEmpty(),
  check("code").optional().notEmpty(),
  check("marca").optional().notEmpty(),
  check("description").optional().notEmpty(),
  check("purchase_date").optional().notEmpty(),
  check("id_employee").optional().notEmpty(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateIdAsset = [
  check("id_asset").exists(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validateCreateAsset, validateUpdateAsset, validateIdAsset };
