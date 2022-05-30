import express from "express";
import { Frame, GIF } from "imagescript";
import fetch from "node-fetch";
import { stop } from "../models/error";
import { decodeImage } from "../tools";
export const MAX_IMAGE_SIZE = 256;
export async function imageSpin(
  req: express.Request,
  res: express.Response
): Promise<void> {
  const url = req.query.url as string;
  if (url) {
    const request = await fetch(url);
    const data = await request.buffer();
    const editor = await decodeImage(data);
    editor.resize(MAX_IMAGE_SIZE, MAX_IMAGE_SIZE);
    editor.cropCircle();

    const composite: Array<Frame> = [];
    for (let i = 0; i < 360; i += 15) {
      const frame = editor.clone();
      frame.rotate(i, false);
      composite.push(Frame.from(frame, undefined, undefined, undefined, Frame.DISPOSAL_BACKGROUND));
    }

    const gif = new GIF(composite);
    const u8: Uint8Array = await gif.encode();

    const sent = Buffer.from(u8);
    res.setHeader("Content-Type", "image/gif");
    res.send(sent);
  } else {
    stop(res, 400, "No image URL provided");
  }
}
