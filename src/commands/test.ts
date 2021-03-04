import { GuildChannel } from "discord.js";
import { client } from "..";
import { capitalizeWords } from "../functions/capitalizeWords";
import { formatTimestamp } from "../functions/formatTimestamp";
import { getGuild } from "../functions/getGuild";
import { getUser } from "../functions/getUser";
import { getUserPermissions } from "../functions/getUserPermissions";
import { makeCodeblock } from "../functions/makeCodeblock";
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
      case "perms":
        if (!message.guild)
          return await message.reply("lol u need to be in a server for this");
        const puser = message.guild.members.cache.get(
          (await getUser(message, args, true, 1))!.id
        );
        if (!puser) return await message.reply("whos that lol");
        const perm = getUserPermissions(puser)
          .map(
            (e) => `\`${capitalizeWords(e.toLowerCase().replace(/_/g, " "))}\``
          )
          .join(", ");
        await message.reply(`Permissions of ${puser}: ${perm}`);
        break;
      case "vanityhtml":
        const url = (
          await (message.channel as GuildChannel).createInvite({
            maxAge: 0,
            maxUses: 0,
          })
        ).url;
        return await message.reply(
          `<title>hi</title>
<meta content="${message.guild?.name}" property="og:title">
<meta content="join if you want lol idc" property="og:description">
<meta content="${url}" property="og:url">
<meta content="${message.guild?.iconURL()}" property="og:image">
<meta content="#2f3136" data-react-helmet="true" name="theme-color">
<script>
    window.location.replace("${url}");
</script>

hi
<!-- HOW ARE YOU READING THIS O_O -->`,
          { code: "html" }
        );
      case "getmessages":
        const user = await getUser(message, args, true, 1);
        const msgs = (await message.channel.messages.fetch())
          .filter((e) => (user ? e.author == user : true))
          .array()
          .sort((a, b) => b.createdTimestamp - a.createdTimestamp)
          .map(
            (e) =>
              `${formatTimestamp(new Date())}**${
                e.author.tag
              }** - ${makeCodeblock(e.content, 30)}`
          )
          .slice(0, 5)
          .join("\n");
        return await message.reply(msgs);
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
