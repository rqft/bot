type Value = "" | "s";

export function s(a: any): Value {
  if (a instanceof Array) return a.length !== 1 ? "s" : "";
  if (a instanceof Number) return a !== 1 ? "s" : "";
  else return "";
}
