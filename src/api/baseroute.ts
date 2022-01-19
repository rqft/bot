import express from "express";
import { Pariah } from "pariah";
import { verifyUrl } from "./importer";
import { HTTPContentTypeEnum, Routy } from "./routy";

export const app = express();
export const router = new Routy();

router.add("/tilt", "get", (req, res) => {
  const verif = verifyUrl(req);
  if (!verif) {
    res
      .contentType(HTTPContentTypeEnum.JSON)
      .status(400)
      .send({
        context: Routy.toContext(req),
        response: { error: "Missing URL parameter" },
      })
      .end();
    return;
  }
  new Pariah({ baseUrl: verif.hostname });

  res.end();
});

router.routes.forEach((v) => {
  app[v.method](v.path, v.handler);
  console.log(`[REGISTER] Registered ${v.method} route: ${v.path}`);
});
