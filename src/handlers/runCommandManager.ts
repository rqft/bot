import { Collection } from "discord.js";
import { ICommand } from "../interfaces/ICommand";
import { color, TerminalColor } from "../types/TerminalColors";

export function runCommandManager(commands: Collection<any, ICommand>) {
  commands
    .array()
    .sort((a, b) => (a.name > b.name ? 1 : -1))
    .forEach((e) => {
      const consoleMessages = [];

      if (!e.description)
        consoleMessages.push(
          `it is recommended to set a ${color(
            "description",
            TerminalColor.normal.GREEN
          )} for the help menu page for this command`
        );
      if (!e.run)
        consoleMessages.push(
          `you must set a ${color("run()", TerminalColor.normal.BLUE)} function`
        );
      if (e.usage == undefined)
        consoleMessages.push(
          `it is recommended to set ${color(
            "usage",
            TerminalColor.normal.GREEN
          )} for the command`
        );
      if (consoleMessages.length)
        console.log(
          `${color("[COMMAND MANAGER]", TerminalColor.normal.MAGENTA)} ${
            e.name
          }:\n${consoleMessages.join("\n")}`
        );
    });
}
