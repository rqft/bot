import { Command, CommandClient } from "detritus-client";
import { Api } from "detritus-client-rest/lib/endpoints";
import { HTTPMethods } from "detritus-rest/lib/constants";
import { CustomEmojis } from "../../enums/customEmojis";
import { Emojis } from "../../enums/emojis";
import {
  APIProfile,
  ConnectionMap,
  connectionUrls,
  ValidAccount,
  ValidAccountType,
} from "../../enums/utils";
import { capitalizeWords } from "../../functions/capitalizeWords";
import { findUser } from "../../functions/findUser";
import { formatTimestamp } from "../../functions/formatTimestamp";
import { generateEmbed } from "../../functions/generateEmbedTemplate";
import { getBotLevel } from "../../functions/getBotLevel";
import { getLongAgo, simpleGetLongAgo } from "../../functions/getLongAgo";
import { getPresence } from "../../functions/getPresence";
import { getProfileBadges } from "../../functions/getProfileBadges";
import { getCollectiveGuilds } from "../../functions/getters";
import { getUserPermissions } from "../../functions/getUserPermissions";
import globalConf from "../../globalConf";
import { CustomError, restSelfClient } from "../../globals";
import { IElement } from "../../interfaces/IElement";
import { BaseCommand } from "../basecommand";

export default class UserCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      label: "user",
      name: "user",
    });
  }
  async run(context: Command.Context, args: Command.ParsedArgs) {
    const user = await findUser(args.user || context.userId);
    if (!user) throw new CustomError("I can't find that user");
    const emb = generateEmbed({ user: context.user });
    emb.setAuthor(
      user.toString(),
      user.avatarUrl ?? user.defaultAvatarUrl,
      user.jumpLink
    );
    emb.setThumbnail(user.avatarUrl ?? user.defaultAvatarUrl);

    const notes = [];
    if (user.bot) {
      const app = context.client.applications.find((v) => v.id === user.id);
      console.log(context.client.applications.map((v) => v.name));
      if (app) {
        console.log(`found application for user ${user}: ${app}`);
        if (app.description) notes.push(app.description);
        if (app.summary) notes.push(app.summary);
        if (app.youtubeTrailerUrl)
          notes.push(`[Youtube Trailer](${app.youtubeTrailerUrl})`);
        if (app.iconUrl) emb.setThumbnail(app.iconUrl);
        if (app.developers)
          notes.push(
            `Developed by ${app.developers
              .map((v) => "<@" + v.id + ">")
              .join("\n")}`
          );
        if (app.publishers)
          notes.push(
            `Published by ${app.publishers
              .map((v) => "<@" + v.id + ">")
              .join("\n")}`
          );
        if (!app.botPublic) notes.push(`Bot cannot be added to servers`);
        if (app.botRequireCodeGrant) notes.push(`Bot requires a code grant`);
      }
      if (user.hasVerifiedBot) notes.push(`This application has been verified`);
    }
    const profile: APIProfile = await restSelfClient.request({
      route: {
        method: HTTPMethods.GET,
        path: Api.USER_PROFILE,
        params: { userId: user.id },
      },
    });

    const knownGuilds = getCollectiveGuilds().filter((v) =>
      v.members.has(user.id)
    );
    if (knownGuilds.length)
      notes.push(
        `Seen on **${knownGuilds.length}** guild${
          knownGuilds.length > 1 ? "s" : ""
        }`
      );
    const nicks = knownGuilds
      .filter((v) => !!v.members.get(user.id)?.nick)
      .map((v) => v.members.get(user.id)?.nick);
    if (nicks.length)
      notes.push(
        `Also known as ${[...new Set(nicks)].map((v) => `**${v}**`).join(", ")}`
      );
    const boosts = knownGuilds.filter(
      (v) => !!v.members.get(user.id)?.isBoosting
    );
    if (boosts.length)
      notes.push(
        `Currently boosting **${boosts.length}** guild${
          boosts.length > 1 ? "s" : ""
        }`
      );
    if (notes.length) emb.addField("❯ Notes", notes.join("\n"));
    const accountType = new Map<ValidAccountType | ValidAccount, IElement>([
      ["bot", { icon: CustomEmojis.GUI_SETTINGS, text: "Bot" }],
      ["user", { icon: CustomEmojis.GUI_FRIENDS, text: "User" }],
      ["team", { icon: CustomEmojis.GUI_ROLE, text: "Team Account" }],
    ]).get(user.hasTeamUser ? "team" : user.bot ? "bot" : "user")!;
    emb.addField(
      `❯ User Info`,
      `${Emojis.GEAR} **󠇰ID**: \`${user.id}\`
${Emojis.LINK} **Profile**: ${user.mention}
${Emojis.CALENDAR_SPIRAL} **Created**: ${simpleGetLongAgo(
        user.createdAtUnix
      )} ago ${formatTimestamp(user.createdAt)}
${accountType.icon} **Account Type**: ${accountType.text}`
    );
    var mem = context.message.guild?.members.cache.get(user.id);
    if (user.presence) emb.addField("❯ Presence", getPresence(user));
    if (mem) {
      const voice = {
        deaf:
          mem.voiceState?.deaf || mem.voiceState?.selfDeaf
            ? `${mem.voiceState?.deaf ? "Server" : "Self"} Deafened`
            : "Undeafened",
        channel: mem.voiceState?.channel?.mention
          ? mem.voiceState?.channel.name
          : "Unknown Channel",
        mute:
          mem.voiceState?.mute || mem.voiceState?.selfMute
            ? `${mem.voiceState?.mute ? "Server" : "Self"} Muted`
            : "Unmuted",
        speaking: "Speaking",
        streaming: mem.voiceState?.selfStream ? "Streaming" : "",
        video: mem.voiceState?.selfVideo ? "On Video" : "",
      };
      const joinedVoice = [
        voice.channel,
        voice.deaf,
        voice.mute,
        voice.speaking,
        voice.streaming,
        voice.video,
      ]
        .filter((e) => e != "")
        .map((e) => `\`${e}\``)
        .join(", ");
      const roles = mem.roles
        .toArray()
        .filter((e) => e !== null && e.guild?.id !== e.id)
        .sort((a, b) => a!.position - b!.position);
      emb.addField(
        "❯ Member Information",
        `${Emojis.INBOX_TRAY} **Joined:** ${getLongAgo(
          mem.joinedAtUnix!,
          2
        )} ago ${formatTimestamp(mem.joinedAt!)} ${
          mem.pending ? `(Currently Pending)` : ""
        }${
          mem.nick ? `\n${Emojis.PENCIL2} **Nickname**: \`${mem.nick}\`` : ""
        }${
          mem.voiceState
            ? `\n${Emojis.TELEPHONE} **Voice**: In ${joinedVoice}`
            : ""
        }${
          roles.length !== 0
            ? `\n${Emojis.SHIELD} **Roles** (${roles.length}): ${roles
                .map((e) => e!.mention)
                .slice(0, 10)
                .join(" ")}${
                roles.length > 10 ? `\nand ${roles.length - 10} more...` : ""
              }`
            : ""
        }`
      );

      emb.addField(
        "❯ Permissions",
        `${Emojis.GEAR} **Permission List**: ${getUserPermissions(mem)
          .map(
            (e) => `\`${capitalizeWords(e.toLowerCase().replace(/_/g, " "))}\``
          )
          .join("  ")}
${Emojis.CYCLONE} **Bot Level**: __\`${getBotLevel(mem).level}\`__ [(${
          getBotLevel(mem).type
        })](https://arcy.gitbook.io/vybose/guides/targeting#levels)`
      );
    }
    const listedBadges = [];
    if (user.publicFlags)
      listedBadges.push((await getProfileBadges(user)).join(" "));
    listedBadges.push(
      ...(globalConf.badges[user.id] ?? []).map(
        (e) =>
          `[${e.icon}](https://arcy.gitbook.io/vybose/infos/profile-badges#${e.anchor})`
      )
    );

    const connections = profile.connected_accounts.filter(
      (v) => v.type.toUpperCase() in connectionUrls
    );

    if (connections.length)
      listedBadges.push(
        "\n",
        ...connections.map(
          (v) =>
            `[${ConnectionMap.get(v.type)!.icon}](${connectionUrls[
              v.type.toUpperCase()
            ]!(v)})`
        )
      );
    var formed = listedBadges.join(" ");
    if (formed.length) emb.setDescription(formed);
    context.editOrReply({
      embed: emb,
    });
  }
}
