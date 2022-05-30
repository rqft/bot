import express from "express";
import { give } from "../models/result";
export async function endpoints(
  _req: express.Request,
  res: express.Response
): Promise<void> {
  const routes: Array<string> = res.app._router.stack
    .filter((x: { route?: unknown }) => x.route)
    .map((x: { route: { path: string } }) => x.route.path);
  give(res, routes);
}
