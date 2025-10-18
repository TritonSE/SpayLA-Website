import mongoose from "mongoose";

import app from "./app";
import { env } from "./env";

async function main() {
  await mongoose.connect(env.MONGO_URI);

  console.info("Connected to database");

  app.listen(env.PORT, () => {
    console.info(`Server is running on port ${env.PORT}`);
  });
}

main().catch((err) => {
  console.error(err);
});
