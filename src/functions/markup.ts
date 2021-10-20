import { Markup as _ } from "detritus-client/lib/utils";
type TimestampFlag = "R" | "D";
function timestamp(unix: number, ...flags: TimestampFlag[]) {
  return `<T:${unix}:${flags.join("")}>`;
}
export const Markup = { ..._, timestamp };
