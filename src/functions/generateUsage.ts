import { Command } from "detritus-client";
import { ArgumentType } from "detritus-client/lib/command";
import globalConf from "../globalConf";
import { isConsecutive, max, min } from "./isConsecutive";
import { optionalBrackets } from "./optionalBrackets";

export function generateUsage(command: Command.Command) {
  const flags = formatArgs(command.argParser.args ?? []);
  const args = formatArgs([command.arg] ?? []);
  return `${globalConf.modules.commands.prefixes[0] ?? "!"}${
    command.name
  } ${args.join(" ")} ${flags.join(" ")}`;
}
function formatArgs(args: Command.Argument[] | Command.ArgumentOptions[]) {
  return args.map((v: Command.Argument | Command.ArgumentOptions) => {
    var type: ArgumentType | undefined = v.type;

    if (v.choices && v.choices.every((v) => !isNaN(parseFloat(v))))
      if (v.choices.includes(Infinity))
        type = `${min(v.choices) === Infinity ? 0 : min(v.choices)} ..`;
      else if (isConsecutive(v.choices))
        type = `${min(v.choices)}..${max(v.choices)}`;

    if (v.choices && v.choices.every((v) => typeof v === "string"))
      type = v.choices.join("|");
    var required = v.required;
    if (v.type === "bool") {
      required = false;
      type = undefined;
    }
    const brackets = optionalBrackets(required);
    return `${brackets.left}${
      (v.prefixes instanceof Set ? Array.from(v.prefixes) : v.prefixes) ?? "-"
    }${v.name}${type ? `: ${v.consume ? "..." : ""}${type}` : ""}${
      brackets.right
    }`;
  });
}
