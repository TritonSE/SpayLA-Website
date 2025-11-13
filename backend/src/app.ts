import cors from "cors";
import express from "express";

import { env } from "./env";
import errorHandler from "./middleware/errorHandler";
import { log } from "./middleware/logger";
import newsletterRoutes from "./routes/newsletters";

const app = express();

app.use(
  cors({
    origin: env.FRONTEND_ORIGIN,
  }),
);

// middleware to parse JSON request bodies
app.use(express.json());

// middleware to log requests
app.use(log);

// Routes
app.get("/", (req, res) => {
  res.send("SpayLA Backend is running!");
});

app.use("/api/newsletters", newsletterRoutes);

app.use(errorHandler);

export default app;
