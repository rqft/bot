import { SnowflakeUtil } from "discord.js";
import { client } from "../..";
import { binaryToHex } from "../../functions/binToHex";
import { simpleGetLongAgo } from "../../functions/getLongAgo";
import { replacer } from "../../functions/replacer";
import { ICommand } from "../../interfaces/ICommand";
import { messages } from "../../messages";
module.exports = {
  name: "snowflake",
  restrictions: {
    level: 5,
    ownerOnly: true,
  },
  args: [
    {
      name: "snowflake",
      required: true,
      type: "string",
    },
  ],
  async run(message, args) {
    const BINARY_INCREMENT = args[1] ?? 16;
    if (args[0]?.toLowerCase() == "me") args[0] = message.author.id;
    if (args[0]?.toLowerCase() == "ready")
      args[0] = SnowflakeUtil.generate(client.readyTimestamp!);
    if (args[0]?.toLowerCase() == "channel") args[0] = message.channel.id;
    if (args[0]?.toLowerCase() == "guild") args[0] = message.guild!.id;
    const snowflake = args[0]?.replace(/\D/g, "");
    if (!snowflake)
      return await message.reply(
        replacer(messages.commands.other.snowflake.invalid_snowflake, [
          ["{SNOWFLAKE}", args[0]],
        ])
      );
    const sn = SnowflakeUtil.deconstruct(snowflake!);
    message.reply(
      `{
  "ID": ${snowflake},
  "Timestamp": ${sn.timestamp},
  "Worker ID": ${sn.workerID},
  "Process ID": ${sn.processID},
  "Increment": ${sn.increment},
  "Binaries": [
    ${sn.binary
      .match(new RegExp(`.{${BINARY_INCREMENT}}`, "g"))
      ?.join("\n    ")}
  ],
  "Hex": 0x${binaryToHex(sn.binary).result?.toLowerCase()},
  "Created": "${sn.date.toLocaleString()} (${simpleGetLongAgo(+sn.date)} ago)"
}`,
      { code: "json" }
    );
  },
} as ICommand;
