import mongoose from "mongoose";

const { Schema } = mongoose;

export type INewsletter = {
  date: Date;
  fileLink: string;
};

const newsletterSchema = new Schema<INewsletter>(
  {
    date: {
      type: Date,
      required: true,
    },
    fileLink: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Newsletter = mongoose.model<INewsletter>("Newsletter", newsletterSchema);

export default Newsletter;
