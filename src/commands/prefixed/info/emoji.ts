import { CommandClient } from "detritus-client";
import { ToolsMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { Parameters } from "../../../tools/parameters";
import { BaseCommand } from "../basecommand";

export default class InfoEmojiCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "info emoji",
      metadata: ToolsMetadata("emoji info", "<emoji: Emoji>", [
        "🍰",
        ":goodbye:",
        "969606376340992060",
      ]),
      type: [
        {
          name: "emoji",
          type: Parameters.emojiUrl,
        },
      ],
    });
  }

  run = Formatter.Info.emoji;
}
