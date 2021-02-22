import { GuildChannel, GuildMember, Role } from "discord.js";
import { client } from "..";
import { formatID } from "../functions/formatID";
import { getGuild } from "../functions/getGuild";
import { ICommand } from "../interfaces/ICommand";
import { decor } from "../maps/emojiEnum";
const tests = ["error"];
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
          embed: JSON.parse(args.slice(1).join(" ")),
        });
        await message.react(decor.Emojis.WHITE_CHECK_MARK);
        break;
      case "setpresence":
        if (!args[1])
          return await message.reply("you need to supply a valid presence");
        client.user?.setPresence(JSON.parse(args.slice(1).join(" ")));
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
      case "logs":
        if (!message.guild) return await message.reply("you need a guild");

        const logs = await message.guild.fetchAuditLogs({
          limit: 5,
        });
        const trackChanges = (old: any, newVal: any) => {
          if (!old && newVal) return `added: ${newVal}`;
          else if (!newVal && old) return `removed: ${old}`;
          else return `changed: ${old} => ${newVal}`;
        };
        const lgs = logs.entries.array().map((e) => {
          const changes = e.changes
            ? `Changes: ${e.changes.map(
                (e) => `\`${e.key}\` was ${trackChanges(e.old, e.new)}`
              )}`
            : "";
          var extra = null;
          if (e.extra instanceof Role)
            extra = `${e.extra.name} ${formatID(e.extra.id)}`;
          else if (e.extra instanceof GuildMember)
            extra = `${e.extra.user.tag} ${formatID(e.extra.id)}`;
          else if (e.extra == null) extra = undefined;
          else extra = `\`\`\`json\n${JSON.stringify(e.extra)}\`\`\``;

          return `\`${e.action}\` by ${e.executor} to ${e.target} ${
            e.reason ? `with reason \`${e.reason}\`` : ""
          }
          Extra: ${extra}
${changes}`;
        });
        message.reply(lgs.join("\n"));
        break;

      default:
        return await message.reply(
          `Unknown test. Valid tests are ${tests
            .map((e) => `\`${e}\``)
            .join(", ")}`
        );
    }
  },
} as ICommand;
