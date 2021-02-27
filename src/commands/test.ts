import { GuildChannel } from "discord.js";
import { client } from "..";
import { getGuild } from "../functions/getGuild";
import { pullCodeFromBlock } from "../functions/pullCodeFromBlock";
import { ICommand } from "../interfaces/ICommand";
import { decor } from "../maps/emojiEnum";
module.exports = {
  name: "test",
  description: "TESTING",
  restrictions: {
    ownerOnly: true,
  },
  usage: "<test: Test>",
  async run(message, args) {
    switch (args[0]?.toLowerCase()) {
      case "error":
        if (!args[1])
          return await message.reply("You need to specify a message");
        client.emit("error", {
          message: args.slice(1).join(" "),
          name: `Error at [${this.name}]`,
          stack: `from #${
            message.channel instanceof GuildChannel
              ? message.channel.name
              : `a DM`
          } by ${message.author.tag}`,
        });
        await message.react(decor.Emojis.WHITE_CHECK_MARK);
        break;
      case "embed":
        if (!args[1])
          return await message.reply("you need to supply a valid embed");
        await message.reply("", {
          embed: JSON.parse(pullCodeFromBlock(args.slice(1).join(" "))),
        });
        await message.react(decor.Emojis.WHITE_CHECK_MARK);
        break;
      case "setpresence":
        if (!args[1])
          return await message.reply("you need to supply a valid presence");
        client.user?.setPresence(
          JSON.parse(pullCodeFromBlock(args.slice(1).join(" ")))
        );
        await message.react(decor.Emojis.WHITE_CHECK_MARK);
        break;
      case "invite":
        if (!args[1]) return await message.reply("you need to supply a server");
        const guild = await getGuild(message, args, true, 1);
        const inv = await guild?.channels.cache
          .filter((e) => e.type == "text")
          .random()
          .createInvite({
            maxAge: 10000,
            unique: true,
            maxUses: 1,
            reason: message.author.tag,
          });
        if (!inv)
          return await message.channel.send("something unexpected happened");
        await message.reply(inv!.url);
        break;
      case "message":
        const tests: { DM?: string; GuildMessage?: string } = {
          DM: undefined,
          GuildMessage: undefined,
        };
        try {
          await (await message.author.send("test")).delete();
          tests.DM = `${decor.Emojis.WHITE_CHECK_MARK} Can Send DMs to this user`;
        } catch {
          tests.DM = `${decor.Emojis.NO_ENTRY} Cannot Send DMs to this user`;
        }
        try {
          await (await message.channel.send("test")).delete();
          tests.GuildMessage = `${decor.Emojis.WHITE_CHECK_MARK} Can send messages to this channel`;
        } catch {
          tests.GuildMessage = `${decor.Emojis.NO_ENTRY} Cannot send messages to this channel`;
        }
        await message.reply(`\u200b
${tests.DM}
${tests.GuildMessage}`);
        break;
      default:
        return await message.reply(`Unknown test`);
    }
  },
} as ICommand;
