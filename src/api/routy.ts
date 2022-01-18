import express from "express";
import { List } from "../functions/list";
export enum HTTPMethodEnum {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
  PATCH = "patch",
  HEAD = "head",
  OPTIONS = "options",
  CONNECT = "connect",
  TRACE = "trace",
  ALL = "all",
}
export type HTTPMethodStrings = `${HTTPMethodEnum}`;
export type HTTPMethods = HTTPMethodEnum | HTTPMethodStrings;
export interface BaseRoute {
  path: string;
  method: HTTPMethods;
  handler: (req: express.Request, res: express.Response) => unknown;
}
export class Routy {
  routes: List<BaseRoute>;
  constructor(from?: List<BaseRoute>) {
    this.routes = from ?? new List();
  }
  add(
    path: string,
    method: HTTPMethods,
    handler: (req: express.Request, res: express.Response) => unknown
  ) {
    this.routes.add({ path, method, handler });
    return this;
  }
  remove(path: string, method: HTTPMethods) {
    const routery = this.get(path, method);
    if (routery) {
      const routeryIdx = this.routes.firstIndexOf(routery!);
      if (routeryIdx) {
        this.routes.delete(routeryIdx);
        return this;
      }
      throw new Error("Index of route not found");
    }
    throw new Error("Route not found");
  }
  get(path: string, method: HTTPMethods) {
    return this.routes.find((v) => v.path === path && v.method === method);
  }
}
