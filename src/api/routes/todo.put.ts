import express from "express";
import { TodoKV } from "../globals";
import { stop } from "../models/error";
import { give } from "../models/result";
export async function todoPut(
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
        const todos = TodoKV.get<Array<string>>(userId)!;
        if (todos) {
          const todo = req.query.data as string | undefined;

          if (todo) {
            todos[id - 1] = todo;
            TodoKV.put(userId, todos);
            give(res, true);
          } else {
            stop(res, 400, "No todo provided");
          }
        } else {
          stop(res, 404, `No todo found for user ${userId} with id ${id}`);
        }
      }
    }
  } else {
    stop(res, 400, "No user provided");
  }
}
