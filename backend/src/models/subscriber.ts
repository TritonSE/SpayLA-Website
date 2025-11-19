import { model, Schema } from "mongoose";

import type { InferSchemaType } from "mongoose";

const subscriberSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
  },
  { timestamps: true },
);

type SubscriberType = InferSchemaType<typeof subscriberSchema>;
const Subscriber = model<SubscriberType>("Subscriber", subscriberSchema);

export default Subscriber;
