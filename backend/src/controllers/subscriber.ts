import Subscriber from "../models/subscriber";

import type { RequestHandler } from "express";

interface CreateSubscriberBody {
  name: string;
  email: string;
}
export const createSubscriber: RequestHandler<
  unknown,
  unknown,
  CreateSubscriberBody,
  unknown
> = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }
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
    const subscribers = await Subscriber.find({});
    res.status(200).json(subscribers);
  } catch (error) {
    next(error);
  }
};
