import { matchedData, validationResult } from "express-validator";

import type { Subscriber as SubscriberType, SubscriberIds } from "../types/subscriber";
import Subscriber from "../models/subscriber";
import validationErrorParser from "../utils/validationErrorParser";

import type { RequestHandler } from "express";

export const createSubscriber: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = validationErrorParser(errors);
    return res.status(400).json({ message: errorMessage });
  }
  const data = matchedData(req) as unknown as SubscriberType;
  const { name, email } = data;
  try {
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(409).json({ message: "Subscriber already exists" });
    }

    const newSubscriber = await Subscriber.create({ name, email });
    res.status(201).json({ message: "Subscriber created", subscriber: newSubscriber });
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
    return res.status(400).json({ message: errorMessage });
  }
  const data = matchedData(req) as unknown as SubscriberIds;
  const { ids } = data;

  try {
    const result = await Subscriber.deleteMany({
      _id: { $in: ids }, //condition
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No subscribers found with the provided IDs." });
    }

    res.status(200).json({ message: `${result.deletedCount} subscriber(s) deleted sucessfully.` });
  } catch (error) {
    next(error);
  }
};
