import express from "express";
import { stop } from "../models/error";
import { give } from "../models/result";
import { base64, ConversionMethods } from "../tools";
export function base64Decode(
  req: express.Request,
  res: express.Response
): void {
  const text = req.query.text as string;
  if (text) {
    give(res, base64(text, ConversionMethods.DECODE));
  } else {
    stop(res, 400, "No text provided");
  }
}
