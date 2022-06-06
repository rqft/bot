import { CommandClient } from "detritus-client";
import { ToolsMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { Parameters } from "../../../tools/parameters";
import { BaseCommand } from "../basecommand";

export default class InfoChannelCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "info channel",
      metadata: ToolsMetadata("channel info", "<channel: Channel=here>", [
        "general",
        "248981745502781440",
        "<#248981745502781440>",
        "https://discord.com/channels/248981745502781440",
      ]),
      type: [
        {
          name: "channel",
          type: Parameters.channel(),
          default: Parameters.Default.channel,
          required: true,
        },
      ],
    });
  }

  run = Formatter.Info.channel;
}
