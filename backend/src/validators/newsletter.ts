import { body, param } from "express-validator";

// POST /api/newsletters - Create a new newsletter (protected route)
const createNewsletterValidator = [
  body("date")
    .notEmpty()
    .withMessage("Date is required")
    .isISO8601()
    .withMessage("Date must be a valid ISO 8601 date"),
  // Ensure a file was uploaded. multer will populate req.file when
  // upload.single('file') is used
  body().custom((_, { req }) => {
    if (!req || !req.file) {
      throw new Error("File is required");
    }
    return true;
  }),
];

const deleteNewsletterValidator = [
  param("id")
    .notEmpty()
    .withMessage("Newsletter ID is required")
    .isMongoId()
    .withMessage("Newsletter ID must be a valid MongoDB ID"),
];

export { createNewsletterValidator, deleteNewsletterValidator };
