import { CommandClient } from "detritus-client";
import { ToolsMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { BaseCommand } from "../basecommand";

export default class TodoPutCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "todo put",
      aliases: ["todo edit"],
      metadata: ToolsMetadata("add todo", "<id: number> <data: string>"),
      type: [
        {
          name: "id",
          type: "number",
          required: true,
        },
        {
          name: "data",
          type: "string",
          required: true,
          consume: true,
        },
      ],
    });
  }

  run = Formatter.Todo.put;
}
