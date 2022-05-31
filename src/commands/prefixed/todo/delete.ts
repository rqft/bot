import { CommandClient } from "detritus-client";
import { ToolsMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { Parameters } from "../../../tools/parameters";
import { BaseCommand } from "../basecommand";

export default class TodoDeleteCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "todo delete",
      aliases: ["todo remove"],
      metadata: ToolsMetadata("delete todo", "<id: number>"),
      type: [
        {
          name: "id",
          type: "string",
          required: true,
        },
      ],

      args: [
        {
          name: "user",
          type: Parameters.user,
          default: Parameters.Default.author,
        },
      ],
    });
  }

  run = Formatter.Todo.remove;
}
