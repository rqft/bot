import { logError } from "../logs/logError";

export function discordjsError(err: Error) {
  logError(err);
}
