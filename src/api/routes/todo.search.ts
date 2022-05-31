import { Request, Response } from "express";
import { TodoKV } from "../globals";
import { stop } from "../models/error";
import { give } from "../models/result";

export function todoSearch(req: Request, res: Response): void {
  const userId = req.params.userId;

  if (userId) {
    const query = req.params.query;

    let choices = (TodoKV.get<Array<string>>(userId) || []).map((x, i) => ({
      data: x,
      index: i + 1,
    }));
    if (query) {
      const results = choices.filter(
        (choice) =>
          choice.data.toLowerCase().includes(query.toLowerCase()) ||
          choice.index.toString().includes(query)
      );
      choices = results;
    }

    give(
      res,
      choices
        .map((choice) => {
          return {
            name: `#${choice.index} - ${choice.data.slice(0, 10)}${
              choice.data.length > 10 ? "..." : ""
            }`,
            value: choice.index,
          };
        })
        .slice(0, 25)
    );
  } else {
    stop(res, 400, "No user provided");
  }
}
