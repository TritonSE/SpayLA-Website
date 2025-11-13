import { body } from "express-validator";

const makeNameValidator = () =>
  body("name")
    .exists()
    .withMessage("Name is required")
    .bail() //prevents rest of chain
    .notEmpty()
    .withMessage("Name cannot be empty")
    .trim()
    .escape();
const makeEmailValidator = () =>
  body("email").isEmail().withMessage("Please provide a valid email address").normalizeEmail();

const makeIDsValidator = () =>
  body("ids")
    .exists()
    .withMessage("An array of subscriber IDs is required.")
    .bail()
    .isArray({ min: 1 })
    .withMessage("A non-empty array of subscriber IDs must be provided")
    .bail();

const makeEachIDInArrayValidator = () =>
  body("ids.*").isMongoId().withMessage("All IDs in the array must be valid MongoDB ObjectIDs.");
export const createSubscriber = [makeNameValidator(), makeEmailValidator()];
export const deleteSubscribers = [makeIDsValidator(), makeEachIDInArrayValidator()];
