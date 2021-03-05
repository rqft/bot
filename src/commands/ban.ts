import { MessageEmbed } from "discord.js";
import { client } from "..";
import { formatID } from "../functions/formatID";
import { formatTimestamp } from "../functions/formatTimestamp";
import { simpleGetLongAgo } from "../functions/getLongAgo";
import { getUser } from "../functions/getUser";
import { makeCodeblock } from "../functions/makeCodeblock";
import { Color } from "../globals";
import { ICommand } from "../interfaces/ICommand";
import { decor } from "../maps/emojiEnum";

module.exports = {
  name: "ban",
  restrictions: {
    permissions: ["BAN_MEMBERS"],
    guildOnly: true,
  },
  usesArgs: true,
  description: "ban someone",
  usage: "<fn: BanFn> <user: User> [reason: string]",
  async run(message, args) {
    const fn = args[0];
    if (!fn) await message.reply("");
    switch (fn) {
      default:
        await message.reply(
          "invalid type, valid ones are: " +
            ["add", "remove", "list", "info"].map((e) => `\`${e}\``).join(", ")
        );
        break;
      case "add":
        const target = await getUser(message, args, false, 1);
        if (!target || target.id == client.user!.id)
          return await message.reply("You need to supply a **bannable** user!");
        const reason = args[2] ? args.slice(2).join(" ") : undefined;
        if (target.id == message.author.id)
          return await message.reply("no, lets not do that.");
        if (target.id == client.user!.id) return await message.reply(":(");
        if (
          message.guild?.members.cache.get(target.id) &&
          !message.guild.members.cache.get(target.id)?.bannable
        )
          return await message.reply("You need to supply a **bannable** user!");
        await message.guild?.members.ban(target, {
          reason: reason,
          days: 1,
        });
        await message.reply(
          `Banned ${target} ${
            reason ? `with reason: ${makeCodeblock(reason, 20)}` : ""
          }`
        );
        break;
      case "remove":
        const unbtarget = await getUser(message, args, false, 1);
        if (!unbtarget) return await message.reply("you need to supply a user");
        if (!(await message.guild?.fetchBans())!.has(unbtarget.id))
          return await message.reply("you need to supply a banned user");
        await message.guild?.members.unban(unbtarget);
        await message.reply(`Unbanned ${unbtarget}`);
        break;
      case "list":
        const banList = await message.guild?.fetchBans();
        if (!banList || !banList.size)
          return await message.reply("nobody here is banned yet");
        const banMentions = banList
          .array()
          .map((e) => `${e.user} ${e.reason ? `- \`${e.reason}\`` : ""}`)
          .join("\n");
        const emb = new MessageEmbed();
        emb.addField("List of bans", banMentions);
        emb.setColor(Color.embed);
        await message.reply(emb);
        break;
      case "info":
        const inftarget = await getUser(message, args, false, 1);
        if (!inftarget)
          return await message.reply("You need to supply a **banned** user!");
        const infBanList = await message.guild?.fetchBans();
        if (!infBanList)
          return await message.reply("nobody here is banned yet");
        if (!infBanList.has(inftarget.id))
          return await message.reply("that user isnt banned");
        const infBan = infBanList.get(inftarget.id)!;
        const infemb = new MessageEmbed();
        const auditLogEntry = (
          await message.guild?.fetchAuditLogs({
            type: "MEMBER_BAN_ADD",
          })
        )?.entries
          .filter((e) => e.target == infBan.user && e.reason == infBan.reason)
          .first();
        infemb.setTitle(`Info for ban #${auditLogEntry?.createdTimestamp}`);

        infemb.addField(
          "❯ Target",
          `${decor.Emojis.GEAR} **ID**: \`${infBan.user.id}\`
${decor.Emojis.LINK} **Profile**: ${infBan.user}
${decor.Emojis.CALENDAR_SPIRAL} **Created**: ${simpleGetLongAgo(
            infBan.user.createdTimestamp
          )} ago ${formatTimestamp(infBan.user.createdAt)}`
        );
        infemb.addField(
          "❯ Ban",
          `${decor.Emojis.PENCIL} **Reason**: ${makeCodeblock(
            infBan.reason ?? "No Reason",
            30
          )}
${decor.Emojis.HAMMER} **Banned By**: ${auditLogEntry?.executor} ${formatID(
            auditLogEntry?.executor.id!
          )}
${decor.Emojis.CALENDAR_SPIRAL} **Created**: ${simpleGetLongAgo(
            auditLogEntry?.createdTimestamp!
          )} ago ${formatTimestamp(auditLogEntry?.createdAt!)}`
        );
        infemb.setColor(Color.embed);
        await message.reply(infemb);
        break;
    }
  },
} as ICommand;
