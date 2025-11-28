import mongoose from "mongoose";

const { Schema } = mongoose;

export type INewsletter = {
  date: Date;
  fileLink: string;
  filePath?: string;
  originalName?: string;
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
    filePath: {
      type: String,
      required: false,
    },
    originalName: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

const Newsletter = mongoose.model<INewsletter>("Newsletter", newsletterSchema);

export default Newsletter;
