import { CommandClient } from "detritus-client";
import { ToolsMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { Parameters } from "../../../tools/parameters";
import { BaseCommand } from "../basecommand";

export default class TodoGetCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "todo list",
      metadata: ToolsMetadata("get todo", "?<-user: User>", [
        "-user @insyri#7314",
      ]),

      args: [
        {
          name: "user",
          type: Parameters.user,
          default: Parameters.Default.author,
        },
      ],
    });
  }

  run = Formatter.Todo.list;
}
