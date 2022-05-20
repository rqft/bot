import express from "express";
import { stop } from "../models/error";
import { give } from "../models/result";
import { binary, ConversionMethods } from "../tools";
export function binaryDecode(
  req: express.Request,
  res: express.Response
): void {
  const text = req.query.text as string;
  if (text) {
    give(res, binary(text, ConversionMethods.DECODE));
  } else {
    stop(res, 400, "No text provided");
  }
}
