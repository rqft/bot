import express from "express";
import { Image } from "imagescript/";
import { stop } from "../models/error";
export async function imageColor(
  req: express.Request,
  res: express.Response
): Promise<void> {
  let [width, height] = (req.params.size || "512x512")
    .split("x")
    .map((x) => Number.parseInt(x));
  if (!width && !height) {
    stop(res, 400, "Invalid image size");
  } else if (!width) {
    width = height!;
  } else if (!height) {
    height = width!;
  }
  let color = req.params.color as string;
  if (color) {
    if (color.startsWith("#")) {
      color = color.slice(1);
    }
    switch (color.length) {
      case 3: {
        const [r, g, b] = color.split("");
        color = r! + r + g + g + b + b + "ff";
        break;
      }
      case 4: {
        const [r, g, b, a] = color.split("");
        color = r! + r + g + g + b + b + a + a;
        break;
      }
      case 6: {
        color = color + "ff";
        break;
      }
      case 8: {
        break;
      }
      default: {
        stop(res, 400, "Invalid hex code");
      }
    }

    const int = parseInt(color, 16);
    const editor = new Image(Number(width), Number(height)).fill(int);

    const u8: Uint8Array = await editor.encode();

    const sent = Buffer.from(u8);
    res.setHeader("Content-Type", "image/png");

    res.send(sent);
  } else {
    stop(res, 400, "No color provided");
  }
}
