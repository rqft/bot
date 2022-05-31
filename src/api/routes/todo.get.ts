import express from "express";
import { TodoKV } from "../globals";
import { stop } from "../models/error";
import { give } from "../models/result";
export async function todoGet(
  req: express.Request,
  res: express.Response
): Promise<void> {
  const userId = req.params.userId;
  if (userId) {
    if (!TodoKV.has(userId)) {
      stop(res, 404, "No todos found for that user");
    } else {
      const id = Number(req.params.id);

      if (Number.isNaN(id)) {
        stop(res, 400, "Invalid id");
      } else {
        const todo = TodoKV.get<Array<string>>(userId)![id - 1];
        if (todo) {
          give(res, todo);
        } else {
          stop(res, 404, `No todo found for user ${userId} with id ${id}`);
        }
      }
    }
  } else {
    stop(res, 400, "No user provided");
  }
}
