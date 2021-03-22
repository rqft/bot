import { SnowflakeUtil } from "discord.js";
import { replacer } from "../../functions/replacer";
import { ICommand } from "../../interfaces/ICommand";
import { messages } from "../../messages";
module.exports = {
  name: "snowflake",
  restrictions: {
    level: 5,
  },
  args: [
    {
      name: "snowflake",
      required: true,
      type: "string",
    },
  ],
  async run(message, args) {
    const snowflake = args[0]?.replace(/\D/g, "");
    if (!snowflake)
      return await message.reply(
        replacer(messages.commands.other.snowflake.invalid_snowflake, [
          ["{SNOWFLAKE}", args[0]],
        ])
      );
    const sn = SnowflakeUtil.deconstruct(snowflake!);
    const msgs = [];
    for (const i in sn) {
      // @ts-ignore shut up
      msgs.push(`${i}: ${sn[i]}`);
    }
    message.reply(msgs.join("\n"), { code: "txt" });
  },
} as ICommand;
