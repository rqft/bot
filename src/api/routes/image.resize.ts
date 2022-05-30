import express from "express";
import { Image } from "imagescript/";
import fetch from "node-fetch";
import { stop } from "../models/error";
import { decodeImage } from "../tools";
export async function imageResize(
  req: express.Request,
  res: express.Response
): Promise<void> {
  const url = req.query.url as string;
  let size = req.params.size;
  if (!size) {
    size = "1";
  }

  if (url) {
    const request = await fetch(url);
    const data = await request.buffer();
    const editor = await decodeImage(data);

    switch (true) {
      case /^\d+x\d+$/.test(size): {
        const [width, height] = size.split("x").map(Number);
        editor.resize(width!, height!);
        break;
      }
      case /^x\d+$/.test(size): {
        const [, height] = size.split("x");
        editor.resize(Image.RESIZE_AUTO, Number(height));
        break;
      }
      case /^\d+x$/.test(size): {
        const [width] = size.split("x");
        editor.resize(Number(width), Image.RESIZE_AUTO);
        break;
      }
      case /^[\d.]+$/.test(size): {
        editor.scale(Number(size));
        break;
      }
      default: {
        stop(res, 400, `Invalid size: ${size}`);
        return;
      }
    }

    const u8: Uint8Array = await editor.encode();

    const sent = Buffer.from(u8);
    res.setHeader("Content-Type", "image/png");

    res.send(sent);
  } else {
    stop(res, 400, "No image URL provided");
  }
}
