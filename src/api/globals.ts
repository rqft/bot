import express from "express";
import { Wilson } from "wilson-kv";
import { User } from "./models/user";
export const Sarah = express();
export const Authorized: Array<User> = [
  { username: "admin", password: "admin" },
  { username: "insyri", password: "abcd" },
  { username: "sern", password: "sern" },
];
export const NeedsNoAuth: Array<string> = ["/authorized", "/endpoints"];
export const TagsKV = new Wilson("kv/tags");
export const TodoKV = new Wilson("kv/todo");
