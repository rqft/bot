import express from "express";
import { TodoKV } from "../globals";
import { stop } from "../models/error";
import { give } from "../models/result";
export async function todoList(
  req: express.Request,
  res: express.Response
): Promise<void> {
  const userId = req.params.userId;
  if (userId) {
    if (!TodoKV.has(userId)) {
      stop(res, 404, "No todos found for that user");
    } else {
      const todos = TodoKV.get<Array<string>>(userId)!;
      give(res, todos);
    }
  } else {
    stop(res, 400, "No user provided");
  }
}
