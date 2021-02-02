import { commands } from "..";
import { ICommand } from "../interfaces/ICommand";

export function fetchCommand(commandName: string) {
  commandName = commandName.toLowerCase();
  return (
    (commands.get(commandName) as ICommand) ||
    (commands.find(
      (cmd: any) => cmd.aliases && cmd.aliases.includes(commandName)
    ) as ICommand)
  );
}
