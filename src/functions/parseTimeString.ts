export enum timeUnits {
  ns = 1e-6,
  μs = 1e-3,
  ms = 1,
  s = 1000,
  min = 1000 * 60,
  h = 1000 * 60 * 60,
  d = 1000 * 60 * 60 * 24,
  w = 1000 * 60 * 60 * 24 * 7,
  mth = 1000 * 60 * 60 * 24 * 30,
  y = 1000 * 60 * 60 * 24 * 365,
  a = 1000 * 60 * 60 * 24 * 365.25,
  dec = 1000 * 60 * 60 * 24 * 365 * 10,
  cen = 1000 * 60 * 60 * 24 * 365 * 100,
}

export const timeUnitsAlliases = {
  ns: ["nanosecond(s)", "nanosec(s)"],
  μs: ["microsec(s)", "microsecond(s)"],
  ms: ["millisecond(s)", "millisec(s)"],
  s: ["sec(s)", "second(s)"],
  min: ["minute(s)", "m", "min(s)"],
  h: ["hr(s)", "hour(s)"],
  d: ["day(s)"],
  w: ["wk(s)", "week(s)"],
  mth: ["mth(s)", "month(s)", "mo(s)"],
  y: ["year(s)"],
  a: ["julianyear(s)"],
  dec: ["decade(s)"],
  cen: ["cent(s)", "century", "centuries"],
};

export function parseTimeString(time: string): number | undefined {
  time = time.split(" ").join("").toLowerCase();
  for (const key in timeUnitsAlliases) {
    let finalTime: number | undefined;
    finalTime = calc(time.replace(key, ""), key as any);
    if (finalTime !== undefined) return finalTime;
    for (const keys of timeUnitsAlliases[key as "ms"]) {
      if (keys.includes("(s)")) {
        finalTime = calc(
          time.replace(keys.replace("(s)", "s"), ""),
          key as any
        );
        if (finalTime !== undefined) return finalTime;
        finalTime = calc(time.replace(keys.replace("(s)", ""), ""), key as any);
        if (finalTime !== undefined) return finalTime;
      } else {
        finalTime = calc(time.replace(keys, ""), key as any);
        if (finalTime !== undefined) return finalTime;
      }
    }
  }
  return;
}
function calc(
  time: string,
  size:
    | "ns"
    | "μs"
    | "ms"
    | "s"
    | "min"
    | "h"
    | "d"
    | "w"
    | "mth"
    | "y"
    | "a"
    | "dec"
    | "cen"
): number | undefined {
  if (time.split("").some((s) => !/[0-9.,:]/g.test(s))) return;
  if (!time.includes(":"))
    if (isNaN(Number.parseFloat(time))) return;
    else return Number.parseFloat(time) * timeUnits[size];
  const times: string[] = time.split(":");
  const firstTime: number = Number.parseInt(times[0]!);
  let secondTime: number = Number.parseInt(times[1]!);
  if (times.length !== 2 || isNaN(firstTime) || isNaN(secondTime)) return;
  if (times[1]!.toString().length < 2) secondTime *= 10;
  else
    while (secondTime.toString().length > 2)
      secondTime = Number.parseInt(secondTime / 10 + "");
  if (size === "min")
    return firstTime * timeUnits["min"] + secondTime * timeUnits["s"];
  if (size === "h")
    return firstTime * timeUnits["h"] + secondTime * timeUnits["min"];
  return;
}
