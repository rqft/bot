import { logError } from "../logs/logError";

export function discordjsError(): (args_0: Error) => void {
  return (err) => {
    logError(err);
  };
}
