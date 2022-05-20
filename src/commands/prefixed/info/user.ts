import { CommandClient } from "detritus-client";
import { ToolsMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { Parameters } from "../../../tools/parameters";
import { BaseCommand } from "../basecommand";

export default class UserCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "info user",
      metadata: ToolsMetadata("user info", "<user: User=self>"),
      type: [
        {
          name: "user",
          type: Parameters.user,
        },
      ],
    });
  }

  run = Formatter.Info.user;
}
