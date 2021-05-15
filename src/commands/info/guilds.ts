import { Command, CommandClient } from "detritus-client";
import { CustomEmojis } from "../../enums/customEmojis";
import { Emojis } from "../../enums/emojis";
import { chunkify } from "../../functions/chunkify";
import { findUser } from "../../functions/findUser";
import { formatTimestamp } from "../../functions/formatTimestamp";
import { generateEmbed } from "../../functions/generateEmbedTemplate";
import { getChannelEmoji } from "../../functions/getChannelEmoji";
import { simpleGetLongAgo } from "../../functions/getLongAgo";
import { getCollectiveGuilds } from "../../functions/getters";
import { getVoiceProperties } from "../../functions/getVoiceProperties";
import { CustomError } from "../../globals";
import { BaseCommand } from "../basecommand";

export default class GuildsCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      label: "user",
      name: "guilds",
      args: [
        {
          name: "page",
          aliases: ["p"],
          type: Number,
        },
        {
          name: "limit",
          aliases: ["l"],
          type: "number",
          choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, Infinity],
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
        {
          name: "nicked",
          aliases: ["nick", "n"],
          type: String,
        },
      ],
    });
  }
  async run(context: Command.Context, args: Command.ParsedArgs) {
    const user = await findUser(args.user || context.userId);
    if (!user) throw new CustomError("I can't find that user");

    var guilds = getCollectiveGuilds().filter((v) => v.members.has(user.id));
    if (args.moderates)
      guilds = guilds.filter((v) => v.members.get(user.id)?.canBanMembers);
    if (args.owns)
      guilds = guilds.filter((v) => v.members.get(user.id)?.isOwner);
    if (args.administrates)
      guilds = guilds.filter((v) => v.members.get(user.id)?.canAdministrator);
    if (args.boosts)
      guilds = guilds.filter((v) => v.members.get(user.id)?.isBoosting);
    if (args.pending)
      guilds = guilds.filter((v) => v.members.get(user.id)?.pending);
    if (args.nicked)
      guilds = guilds.filter(
        (v) =>
          v.members.get(user.id)?.nick &&
          v.members
            .get(user.id)
            ?.nick?.toLowerCase()
            .includes(args.nicked.toLowerCase())
      );
    if (!guilds.length)
      return await context.editOrReply(
        "❌ Could not find any guild records for this user"
      );

    var PAGE_LENGTH = args.limit ?? 5;
    PAGE_LENGTH = PAGE_LENGTH > 10 ? 10 : PAGE_LENGTH;

    const guildChunks = chunkify(guilds, PAGE_LENGTH);
    const guildPage = guildChunks[(args.page ?? 1) - 1] ?? guildChunks[0];

    const emb = generateEmbed({
      user: context.user,
      otherText: `(${args.page ?? 1}/${guildChunks.length}) | Showing ${
        guildPage?.length
      } out of ${guilds.length} result${guilds.length > 1 ? "s" : ""}`,
    });

    emb.setAuthor(
      user.toString(),
      user.avatarUrl ?? user.defaultAvatarUrl,
      user.jumpLink
    );

    emb.setThumbnail(user.avatarUrl ?? user.defaultAvatarUrl);

    guildPage?.forEach((v) => {
      const data: string[] = [];
      const member = v.members.get(user.id)!;

      if (member.joinedAt)
        data.push(
          `${CustomEmojis.GUI_JOIN_ARROW} ${
            Math.abs(member.joinedAtUnix - v.createdAtUnix) < 15 * 1000
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

      const messages = member.messages.filter(
        (m) => !!m.guild && m.guild.id === v.id
      );
      const lastMessage = messages.slice(-1)[0];
      if (messages.length && lastMessage)
        data.push(
          `${CustomEmojis.CHANNEL_THREAD} Last seen ${simpleGetLongAgo(
            lastMessage.createdAtUnix
          )} ago ${formatTimestamp(lastMessage.createdAt)}`
        );
      if (v.me && v.me.joinedAt && member.joinedAt) {
        var firstSeen =
          +v.me.joinedAt > +member.joinedAt
            ? v.me.joinedAt
            : +v.me.joinedAt < +member.joinedAt
            ? member.joinedAt
            : v.me.joinedAt;
        data.push(
          `${CustomEmojis.GUI_REPLY} Collected by ${
            v.me.mention
          } ${simpleGetLongAgo(+firstSeen)} ago ${formatTimestamp(firstSeen)}`
        );
      }
      emb.addField(
        `${v.name} (${v.id})`,
        data.length ? data.join("\n") : "❌ No data found"
      );
    });
    context.editOrReply({ embed: emb });
  }
}
