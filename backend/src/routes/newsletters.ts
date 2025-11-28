import crypto from "node:crypto";
import path from "node:path";

import express from "express";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import multer from "multer";

import { storage } from "../lib/firebase";
import { authenticated } from "../middleware/auth";
import Newsletter from "../models/newsletter";
import validationErrorParser from "../utils/validationErrorParser";
import { createNewsletterValidator, deleteNewsletterValidator } from "../validators/newsletter";

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
};

// Use memory storage since we'll stream the file to Firebase Storage
const upload = multer({ storage: multer.memoryStorage() });

const createNewsletter: RequestHandler = async (req, res, next) => {
  const errors = validationErrorParser(validationResult(req));
  if (errors) {
    return next(createHttpError(400, errors));
  }

  try {
    const { date } = req.body as CreateNewsletterBody;
    const file = req.file;

    if (!file) return next(createHttpError(400, "File missing"));

    const ext = path.extname(file.originalname) || "";
    const uuid = crypto.randomUUID();
    const timestamp = Date.now();
    const filePath = `newsletters/${timestamp}_${uuid}${ext}`;

    const bucket = storage.bucket();
    const storageFile = bucket.file(filePath);

    await storageFile.save(file.buffer, {
      metadata: {
        contentType: file.mimetype,
      },
    });

    // long-lived
    const [signedUrl] = await storageFile.getSignedUrl({
      action: "read",
      expires: "03-01-2500",
    });

    const newsletter = await Newsletter.create({
      date: new Date(date),
      fileLink: signedUrl,
      filePath,
      originalName: file.originalname,
    });

    return res.status(201).json(newsletter);
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

    if (newsletter.filePath) {
      try {
        await storage.bucket().file(newsletter.filePath).delete();
      } catch (err) {
        console.error("Error deleting newsletter file from storage:", err);
      }
    } else {
      console.warn("No filePath stored for newsletter, skipping storage delete");
    }

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// Routes
router.get("/", getNewsletters);
router.post("/", authenticated, upload.single("file"), createNewsletterValidator, createNewsletter);
router.delete("/:id", authenticated, deleteNewsletterValidator, deleteNewsletter);

export default router;
