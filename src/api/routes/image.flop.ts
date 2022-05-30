import express from "express";
import { stop } from "../models/error";
import fetch from "node-fetch";
import { Frame, Image } from "imagescript/";
import { decodeImage } from "../tools";
export async function imageFlop(
  req: express.Request,
  res: express.Response
): Promise<void> {
  const url = req.query.url as string;
  const method = (req.query.method as MirrorMethods) || MirrorMethods.LEFT;
  console.log(req.query);
  if (!(method in MirrorMethods)) {
    stop(res, 400, `Invalid method: ${method}`);
    return;
  }
  if (url) {
    const request = await fetch(url);
    const data = await request.buffer();
    let editor = await decodeImage(data);

    editor = mirror(editor, method);

    const u8: Uint8Array = await editor.encode();

    const sent = Buffer.from(u8);
    res.setHeader("Content-Type", "image/png");

    res.send(sent);
  } else {
    stop(res, 400, "No image URL provided");
  }
}
export enum MirrorMethods {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  TOP = "TOP",
  BOTTOM = "BOTTOM",
}
export function mirror<T extends Image | Frame>(
  frame: T,
  method: MirrorMethods = MirrorMethods.LEFT
): T {
  for (let x = 1; x < frame.width; x++) {
    for (let y = 1; y < frame.height; y++) {
      switch (method) {
        case MirrorMethods.LEFT: {
          const pixel = frame.getPixelAt(x, y);
          frame.setPixelAt(frame.width - x, y, pixel);
          break;
        }
        case MirrorMethods.RIGHT: {
          const pixel = frame.getPixelAt(frame.width - x, y);
          frame.setPixelAt(x, y, pixel);
          break;
        }
        case MirrorMethods.TOP: {
          const pixel = frame.getPixelAt(x, y);
          frame.setPixelAt(x, frame.height - y, pixel);
          break;
        }
        case MirrorMethods.BOTTOM: {
          const pixel = frame.getPixelAt(x, frame.height - y);
          frame.setPixelAt(x, y, pixel);
          break;
        }
      }
    }
  }
  return frame;
}
