import express from "express";
import { Wilson } from "wilson-kv";
import { User } from "./models/user";
export const Sarah = express();
export const Authorized: Array<User> = [
  { username: "admin", password: "admin" },
  { username: "insyri", password: "abcd" },
];
export const NeedsNoAuth: Array<string> = ["/authorized"];
export const TagsKV = new Wilson("kv/tags");
