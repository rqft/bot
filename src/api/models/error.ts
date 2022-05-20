import { Response } from "express";
import { give } from "./result";

export interface ErrorOk {
  message?: undefined;
  code?: undefined;
  state: "ok";
}
export interface ErrorBad {
  message: string;
  code: number;
  state: "error";
}
export type Error = ErrorOk | ErrorBad;
export function stop(res: Response, code: number, message: string) {
  res.status(code);
  give(res, null, { state: "error", message, code });
}
