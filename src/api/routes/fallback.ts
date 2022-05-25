import express from "express";
import { stop } from "../models/error";
export function fallback(
  req: express.Request,
  res: express.Response
): void {
  stop(res, 404, `Cannot ${req.method} ${req.path}`);
}
