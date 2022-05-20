import { Request, Response } from "express";
import { TagsKV } from "../globals";
import { give } from "../models/result";

export function tagSearch(req: Request, res: Response): void {
  const query = req.params.query;
  console.log(query);

  let choices = TagsKV.list();
  if (query) {
    const results = choices.filter((choice) =>
      choice.toLowerCase().includes(query.toLowerCase())
    );
    choices = results;
  }

  console.log(choices);

  give(
    res,
    choices
      .map((choice) => {
        return {
          name: choice,
          value: choice,
        };
      })
      .slice(0, 25)
  );
}
