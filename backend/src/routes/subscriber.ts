import { Router } from "express";

import { createSubscriber, deleteSubscribers, getSubscribers } from "../controllers/subscriber";
import * as SubscriberValidator from "../validators/subscriber";

const router = Router();

router.get("/", getSubscribers);

router.post("/", SubscriberValidator.createSubscriber, createSubscriber);

router.delete("/", SubscriberValidator.deleteSubscribers, deleteSubscribers);

export default router;
