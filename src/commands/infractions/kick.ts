import { replacer } from "../../functions/replacer";
import { search_guildMember } from "../../functions/searching/guildMember";
import { checkTargets } from "../../functions/targeting/checkTargets";
import globalConf from "../../globalConf";
import { reply } from "../../handlers/command";
import { ICommand } from "../../interfaces/ICommand";
import { messages } from "../../messages";
module.exports = {
  name: "kick",
  args: [
    {
      name: "user",
      required: true,
      type: "GuildMember",
    },
    {
      name: "reason",
      required: false,
      type: "text",
    },
  ],
  restrictions: {
    botPermissions: ["KICK_MEMBERS"],
    level: 50,
    permissions: ["KICK_MEMBERS"],
  },
  async run(message, args) {
    const user = await search_guildMember(args[0]!, message.guild!);
    if (!user) return reply(message, messages.targeting.not_found.guild_member);
    if (user.id == message.author.id)
      return await reply(message, messages.targeting.actor_cant_self);
    if (user.id == globalConf.botId)
      return await reply(message, messages.targeting.me);
    const reason = args.slice(1).join(" ");
    const tg = checkTargets(message.member!, user);
    if (!tg.checks.globalAdm || !tg.checks.level || !tg.checks.roles)
      return reply(message, tg.messages.join("\n"));
    try {
      user.kick(reason);
    } catch {
      return reply(message, messages.commands.infractions.failed_kick);
    }
    return reply(
      message,

      replacer(messages.commands.infractions.kicked_member, [
        ["{USER}", user.toString()],
        ["{REASON}", reason ? `with reason \`${reason}\`` : ""],
      ])
    );
  },
} as ICommand;
