import { Response } from "express";
import { Error } from "./error";

export interface Result<T> {
  data: T;
  status: Error;
}
export function give<T>(
  res: Response,
  data: T,
  status: Error = { state: "ok", message: undefined, code: undefined }
): void {
  res.send({ data, status });
}
