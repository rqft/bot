import { CommandClient } from "detritus-client";
import { ToolsMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { Parameters } from "../../../tools/parameters";
import { BaseCommand } from "../basecommand";

export default class InfoRoleCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "info role",
      metadata: ToolsMetadata("role info", "<role: Role>"),
      type: [
        {
          name: "role",
          type: Parameters.role,
        },
      ],
    });
  }

  run = Formatter.Info.role;
}
