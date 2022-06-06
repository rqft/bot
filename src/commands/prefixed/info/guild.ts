import { CommandClient } from "detritus-client";
import { ToolsMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { Parameters } from "../../../tools/parameters";
import { BaseCommand } from "../basecommand";

export default class InfoGuildCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "info guild",
      aliases: ["info server"],
      metadata: ToolsMetadata("guild info", "<guild: Guild=here>", [
        "walking",
        "248981745502781440",
      ]),

      type: [
        {
          name: "guild",
          type: Parameters.guild,
          default: Parameters.Default.guild,
        },
      ],
    });
  }

  run = Formatter.Info.guild;
}
