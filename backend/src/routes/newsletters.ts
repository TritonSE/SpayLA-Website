import express from "express";
import { body, validationResult } from "express-validator";
import createHttpError from "http-errors";

import { authenticated } from "../middleware/auth";
import Newsletter from "../models/newsletter";
import validationErrorParser from "../utils/validationErrorParser";

import type { RequestHandler } from "express";

const router = express.Router();

// GET /api/newsletters - Get all newsletters
const getNewsletters: RequestHandler = async (req, res, next) => {
  try {
    const newsletters = await Newsletter.find().sort({ date: -1 });
    res.status(200).json(newsletters);
  } catch (error) {
    next(error);
  }
};

// POST /api/newsletters - Create a new newsletter (protected route)
const createNewsletterValidators = [
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

type CreateNewsletterBody = {
  date: string;
  fileLink: string;
};

const createNewsletter: RequestHandler = async (req, res, next) => {
  const errors = validationErrorParser(validationResult(req));
  if (errors) {
    return next(createHttpError(400, errors));
  }

  try {
    const { date, fileLink } = req.body as CreateNewsletterBody;

    const newsletter = await Newsletter.create({
      date: new Date(date),
      fileLink,
    });

    res.status(201).json(newsletter);
  } catch (error) {
    next(error);
  }
};

// Routes
router.get("/", getNewsletters);
router.post("/", authenticated, createNewsletterValidators, createNewsletter);

export default router;
