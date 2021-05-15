import { Command, CommandClient } from "detritus-client";
import { CustomEmojis } from "../../enums/customEmojis";
import { Emojis } from "../../enums/emojis";
import { chunkify } from "../../functions/chunkify";
import { findGuild } from "../../functions/findGuild";
import { formatTimestamp } from "../../functions/formatTimestamp";
import { generateEmbed } from "../../functions/generateEmbedTemplate";
import { getChannelEmoji } from "../../functions/getChannelEmoji";
import { simpleGetLongAgo } from "../../functions/getLongAgo";
import { getVoiceProperties } from "../../functions/getVoiceProperties";
import { CustomError } from "../../globals";
import { messages } from "../../messages";
import { BaseCommand } from "../basecommand";

export default class MembersCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      label: "guild",
      name: "members",
      args: [
        {
          name: "page",
          aliases: ["p"],
          type: Number,
        },
        {
          name: "limit",
          aliases: ["l"],
          type: Number,
          choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        },
        {
          name: "moderates",
          aliases: ["m"],
          type: Boolean,
          default: false,
        },
        {
          name: "owns",
          aliases: ["o"],
          type: Boolean,
          default: false,
        },
        {
          name: "administrates",
          aliases: ["a"],
          type: Boolean,
          default: false,
        },
        {
          name: "boosts",
          aliases: ["b"],
          type: Boolean,
          default: false,
        },
        {
          name: "pending",
          type: Boolean,
          default: false,
        },
      ],
    });
  }
  async run(context: Command.Context, args: Command.ParsedArgs) {
    const guild = findGuild(args[this.label] || context.guildId);
    if (!guild)
      return await context.editOrReply(messages.targeting.not_found.guild);
    var members = guild.members.toArray();

    if (args.moderates) members = members.filter((v) => v.canBanMembers);
    if (args.owns) members = members.filter((v) => v.isOwner);
    if (args.administrates) members = members.filter((v) => v.canAdministrator);
    if (args.boosts) members = members.filter((v) => v.isBoosting);
    if (args.pending) members = members.filter((v) => v.pending);
    if (!members.length)
      throw new CustomError("Could not find any members for this gulid");

    var PAGE_LENGTH = args.limit ?? 5;
    PAGE_LENGTH = PAGE_LENGTH > 10 ? 10 : PAGE_LENGTH;
    const memberChunks = chunkify(members, PAGE_LENGTH);
    const memberPage = memberChunks[(args.page ?? 1) - 1] ?? memberChunks[0];
    const emb = generateEmbed({
      user: context.user,
      otherText: `(${args.page ?? 1}/${memberChunks.length}) | Showing ${
        memberPage?.length
      } out of ${members.length} result${members.length > 1 ? "s" : ""}`,
    });
    emb.setAuthor(guild.toString(), guild.iconUrl, guild.jumpLink);
    guild.iconUrl ? emb.setThumbnail(guild.iconUrl) : null;
    memberPage?.forEach((member) => {
      const data: string[] = [];

      if (member.joinedAt)
        data.push(
          `${CustomEmojis.GUI_JOIN_ARROW} ${
            Math.abs(member.joinedAtUnix - guild.createdAtUnix) < 15 * 1000
              ? `Created server`
              : member.bot
              ? `Added`
              : `Joined`
          } ${simpleGetLongAgo(member.joinedAtUnix)} ago ${formatTimestamp(
            member.joinedAt
          )}`
        );
      if (member.nick)
        data.push(`${Emojis.NOTEPAD_SPIRAL} Shown as **${member.nick}**`);
      if (member.premiumSince && member.isBoosting)
        data.push(
          `${CustomEmojis.BADGE_SERVER_BOOSTER} Boosting for ${simpleGetLongAgo(
            member.premiumSinceUnix
          )} ${formatTimestamp(member.premiumSince)}`
        );
      if (!member.isOwner && member.canAdministrator)
        data.push(`${CustomEmojis.GUI_PINS} Administrates this server`);
      if (!member.isOwner && member.canBanMembers && !member.canAdministrator)
        data.push(`${CustomEmojis.GUI_SETTINGS} Moderates this server`);
      if (member.isOwner)
        data.push(`${CustomEmojis.GUI_OWNERCROWN} Owns this server`);
      if (member.pending)
        data.push(`${CustomEmojis.GUI_SLOWMODE} Has not passed welcome screen`);
      if (member.voiceState) {
        const properties = getVoiceProperties(member.voiceState);
        const emoji = getChannelEmoji(member.voiceState.channel!);
        const prop = `${
          properties.length
            ? `(${properties.map((v) => `\`${v.text}\``).join(" ")})`
            : ""
        }`;
        data.push(
          `${emoji} ${
            member.voiceState.suppress ? "Listening" : "Speaking"
          } in ${member.voiceState.channel} ${prop}`
        );
      }
      const messages = member.messages.filter((m) => m.guild!.id === member.id);
      const lastMessage = messages.slice(-1)[0];
      if (messages.length && lastMessage)
        data.push(
          `${CustomEmojis.CHANNEL_THREAD} Last seen ${simpleGetLongAgo(
            lastMessage.createdAtUnix
          )} ago ${formatTimestamp(lastMessage.createdAt)}`
        );
      emb.addField(
        `${member.toString()} (${member.id})`,
        data.length ? data.join("\n") : "❌ No data found"
      );
    });
    context.editOrReply({ embed: emb });
  }
}
