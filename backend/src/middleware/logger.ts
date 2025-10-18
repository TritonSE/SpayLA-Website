import type { RequestHandler } from "express";

export const log: RequestHandler = (req, res, next) => {
  console.info(
    `${req.method}\t${req.url}\t${req.headers.origin ? req.headers.origin : "Unknown Origin"}`,
  );

  next();
};
