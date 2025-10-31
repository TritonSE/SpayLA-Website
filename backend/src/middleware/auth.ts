import createHttpError from "http-errors";

import { auth } from "../lib/firebase";

import type { NextFunction, Request, Response } from "express";

const authenticated = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;
  const token =
    authHeader && authHeader.split(" ")[0] === "Bearer" ? authHeader.split(" ")[1] : null;
  if (!token) {
    return next(createHttpError(401, "Unauthorized: No token provided"));
  }

  try {
    await auth.verifyIdToken(token);

    return next();
  } catch (_) {
    return next(createHttpError(403, "Invalid or expired token"));
  }
};

export { authenticated };
