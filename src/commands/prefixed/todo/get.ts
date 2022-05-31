import { CommandClient } from "detritus-client";
import { ToolsMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { Parameters } from "../../../tools/parameters";
import { BaseCommand } from "../basecommand";

export default class TodoGetCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "todo",
      aliases: ["todo get"],
      priority: -1,
      metadata: ToolsMetadata("get todo", "<id: number> ?<-user: User>"),
      type: [
        {
          name: "id",
          type: "number",
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

  run = Formatter.Todo.get;
}
