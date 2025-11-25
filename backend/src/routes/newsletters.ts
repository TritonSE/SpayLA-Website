import express from "express";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";

import { authenticated } from "../middleware/auth";
import Newsletter from "../models/newsletter";
import validationErrorParser from "../utils/validationErrorParser";
import { createNewsletterValidator } from "../validators/newsletter";

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

const deleteNewsletter: RequestHandler = async (req, res, next) => {
  const errors = validationErrorParser(validationResult(req));
  if (errors) {
    return next(createHttpError(400, errors));
  }

  const { id } = req.params;

  try {
    const newsletter = await Newsletter.findByIdAndDelete(id);

    if (!newsletter) {
      return next(createHttpError(404, "Newsletter not found"));
    }

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// Routes
router.get("/", getNewsletters);
router.post("/", authenticated, createNewsletterValidator, createNewsletter);
router.delete("/:id", deleteNewsletter);

export default router;
