import express from "express";
import { Routy } from "./routy";

export const app = express();
export const router = new Routy();

router.add("/tilt", "get", (_req, res) => {
  res.contentType("application/json");
  res.send({ context: _req.url, response: "hi" });
  res.end();
});

router.routes.forEach((v) => {
  app[v.method](v.path, v.handler);
  console.log(`[REGISTER] Registered ${v.method} route: ${v.path}`);
});
