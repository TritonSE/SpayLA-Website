import { Router } from "express";

import { createSubscriber, deleteSubscribers, getSubscribers } from "../controllers/subscriber";
import { authenticated } from "../middleware/auth";
import * as SubscriberValidator from "../validators/subscriber";

const router = Router();

router.get("/", authenticated, getSubscribers);

router.post("/", SubscriberValidator.createSubscriber, createSubscriber);

router.delete("/", authenticated, SubscriberValidator.deleteSubscribers, deleteSubscribers);

export default router;
