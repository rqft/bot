import { Request, Response } from "express";
import { TagsKV } from "../globals";
import { stop } from "../models/error";
import { give } from "../models/result";

export function tagPost(req: Request, res: Response): void {
  const key = req.params.key;
  const value = req.query.value as string;
  if (key && value) {
    TagsKV.put(key, value);
    give(res, true);
  } else {
    stop(res, 400, "Missing required path parameter 'key' or 'value'");
  }
}
