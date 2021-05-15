import { CommandClient } from "detritus-client";

export const findCommand = (commandClient: CommandClient, query: string) =>
  commandClient.commands.find((v) => v.names.includes(query.toLowerCase()));
