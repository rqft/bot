import fetch from "node-fetch";
import { config } from "../config";

export async function is_eval(script: string, inject: object = {}) {
  const res = await fetch("https://fapi.wrmsr.io/image_script", {
    method: "POST",
    body: JSON.stringify({ args: { inject, text: script } }),

    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${config.global.keys.fAPI}`,
    },
  });

  if (!res.ok) return [false, await res.text(), null];
  return [true, await res.buffer(), res.headers];
}
