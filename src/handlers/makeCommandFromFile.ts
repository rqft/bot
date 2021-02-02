import { Collection } from "discord.js";
import { CMDFilesPath } from "../globals";

export function makeCommands(
  commands: Collection<any, any>
): (value: string, index: number, array: string[]) => void {
  return (file) => {
    const command = require(`${CMDFilesPath}/${file}`);
    commands.set(command.name, command);
  };
}
