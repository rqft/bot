import express from "express";

export function verifyUrl(req: express.Request) {
  const q = req.query;
  if (!q.url) {
    return null;
  }
  let urly: URL;

  try {
    urly = new URL(q.url.toString());
  } catch {
    return null;
  }
  if (urly.hostname === "") {
    return null;
  }
  return urly;
}
