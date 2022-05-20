import express from "express";
import { Authorized } from "./globals";
import { stop } from "./models/error";
import { base64, ConversionMethods } from "./tools";
export function auth(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const token = req.headers.authorization || (req.query.token as string);
  if (token) {
    if (isAuthorized(token)) {
      next();
    } else {
      stop(res, 401, "Unauthorized");
    }
  } else {
    stop(res, 400, "No token provided");
  }
}
export function isAuthorized(token: string): boolean {
  const decoded = base64(token, ConversionMethods.DECODE);
  const [username, password] = decoded.split(":");
  const isAuthorized = Authorized.find(
    (item) => item.username === username && item.password === password
  );
  return !!isAuthorized;
}
