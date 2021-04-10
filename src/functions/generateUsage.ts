import globalConf from "../globalConf";
import { ICommand } from "../interfaces/ICommand";

export function generateUsage(command: ICommand) {
  return `${globalConf.modules.commands.prefixes[0]}${
    command.name
  } ${command.args
    .map(
      (e) =>
        `${e.required ? "<" : "("}${e.name}: ${e.type}${e.required ? ">" : ")"}`
    )
    .join(" ")}`;
}
enum hi {
  o = 1,
  n = 2,
}
const keys = Object.keys(hi);
keys;
