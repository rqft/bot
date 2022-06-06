import { CommandClient } from "detritus-client";
import { ToolsMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { BaseCommand } from "../basecommand";

export default class TodoDeleteCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "todo delete",
      aliases: ["todo remove"],
      metadata: ToolsMetadata("delete todo", "<id: number>", ["1"]),
      type: [
        {
          name: "id",
          type: "string",
          required: true,
        },
      ],

      args: [],
    });
  }

  run = Formatter.Todo.remove;
}
