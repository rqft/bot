import express from "express";
import fetch from "node-fetch";
import { stop } from "../models/error";
import { decodeImage } from "../tools";
export async function imageResize(
  req: express.Request,
  res: express.Response
): Promise<void> {
  const url = req.query.url as string;
  let deg = Number.parseInt(req.params.deg || "0");

  if (Number.isNaN(deg)) {
    stop(res, 400, "No angle provided");
    return;
  }

  if (url) {
    const request = await fetch(url);
    const data = await request.buffer();
    let editor = await decodeImage(data);

    let u8: Uint8Array = await editor.encode();

    const sent = Buffer.from(u8);
    res.setHeader("Content-Type", "image/png");

    res.send(sent);
  } else {
    stop(res, 400, "No image URL provided");
  }
}
