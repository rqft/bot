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
export enum HTTPContentTypeEnum {
  JSON = "application/json",
  HTML = "text/html",
  TEXT = "text/plain",
  CSS = "text/css",
  JS = "application/javascript",
  PNG = "image/png",
  JPEG = "image/jpeg",
  GIF = "image/gif",
  SVG = "image/svg+xml",
  OCTET = "application/octet-stream",
  FORM = "application/x-www-form-urlencoded",
  FORM_DATA = "multipart/form-data",
  MULTIPART = "multipart/mixed",
  ANY = "*/*",
}
export type HTTPContentTypeStrings = `${HTTPContentTypeEnum}`;
export interface RoutyContext {
  method: HTTPMethodEnum;
  path: string;
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
  static toContext(req: express.Request): RoutyContext {
    return {
      method: req.method as HTTPMethodEnum,
      path: req.path,
    };
  }
}
