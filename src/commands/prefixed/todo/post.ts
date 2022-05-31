import { CommandClient } from "detritus-client";
import { ToolsMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { BaseCommand } from "../basecommand";

export default class TodoPostCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "todo post",
      aliases: ["todo add"],
      metadata: ToolsMetadata("add todo", "<data: string>"),
      type: [
        {
          name: "data",
          type: "string",
          required: true,
          consume: true,
        },
      ],
    });
  }

  run = Formatter.Todo.post;
}
