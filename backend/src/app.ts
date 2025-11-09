import cors from "cors";
import express from "express";

import { env } from "./env";
import errorHandler from "./middleware/errorHandler";
import { log } from "./middleware/logger";

const app = express();

app.use(
  cors({
    origin: env.FRONTEND_ORIGIN,
  }),
);

// middleware to log requests
app.use(log);

// Routes
app.get("/api/", (req, res) => {
  res.send("SpayLA Backend is running!");
});

// Global error handler: all errors thrown by server are handled here
app.use(errorHandler);

export default app;
