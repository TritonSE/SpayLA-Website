import { body } from "express-validator";

// POST /api/newsletters - Create a new newsletter (protected route)
const createNewsletterValidator = [
  body("date")
    .notEmpty()
    .withMessage("Date is required")
    .isISO8601()
    .withMessage("Date must be a valid ISO 8601 date"),
  body("fileLink")
    .notEmpty()
    .withMessage("File link is required")
    .isURL()
    .withMessage("File link must be a valid URL"),
];

const deleteNewsletterValidator = [
  body("id")
    .notEmpty()
    .withMessage("Newsletter ID is required")
    .isMongoId()
    .withMessage("Newsletter ID must be a valid MongoDB ID"),
];

export { createNewsletterValidator, deleteNewsletterValidator };
