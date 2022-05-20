import { Request, Response } from "express";
import { TagsKV } from "../globals";
import { give } from "../models/result";

export function tagInspect(_req: Request, res: Response): void {
  give(res, TagsKV.read());
}
