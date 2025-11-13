import { matchedData, validationResult } from "express-validator";
import createHttpError from "http-errors";

import Subscriber from "../models/subscriber";
import validationErrorParser from "../utils/validationErrorParser";

import type { SubscriberIds, Subscriber as SubscriberType } from "../types/subscriber";
import type { RequestHandler } from "express";

export const createSubscriber: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = validationErrorParser(errors);
    return next(createHttpError(400, errorMessage));
  }
  const data = matchedData(req) as unknown as SubscriberType;
  const { name, email } = data;
  try {
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return next(createHttpError(409, "Subscriber already exists"));
    }

    const newSubscriber = await Subscriber.create({ name, email });
    res.status(201).json(newSubscriber);
  } catch (error) {
    next(error);
  }
};

export const getSubscribers: RequestHandler = async (req, res, next) => {
  try {
    const subscribers = await Subscriber.find();
    res.status(200).json(subscribers);
  } catch (error) {
    next(error);
  }
};

export const deleteSubscribers: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = validationErrorParser(errors);
    return next(createHttpError(400, errorMessage));
  }
  const data = matchedData(req) as unknown as SubscriberIds;
  const { ids } = data;

  try {
    const result = await Subscriber.deleteMany({
      _id: { $in: ids }, //condition
    });

    if (result.deletedCount === 0) {
      return next(createHttpError(404, "No subscribers found with the provided IDs."));
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
