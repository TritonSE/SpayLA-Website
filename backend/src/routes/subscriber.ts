import { Router } from "express";

import { createSubscriber, getSubscribers } from "../controllers/subscriber";

const router = Router();

router.get("/", getSubscribers);

router.post("/", createSubscriber);

export default router;
