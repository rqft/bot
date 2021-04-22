import { Permissions, PlatformTypes } from "detritus-client/lib/constants";
import { Embed } from "detritus-client/lib/utils";
import { CustomEmojis } from "../../enums/customEmojis";
import { Emojis } from "../../enums/emojis";
import { ConnectionMap, UserFlagArray } from "../../enums/utils";
import { bitfieldToArray } from "../../functions/bitfieldToArray";
import { capitalizeWords } from "../../functions/capitalizeWords";
import { findUser } from "../../functions/findUser";
import { formatTimestamp } from "../../functions/formatTimestamp";
import { getBotLevel } from "../../functions/getBotLevel";
import { getLongAgo, simpleGetLongAgo } from "../../functions/getLongAgo";
import { getPresence } from "../../functions/getPresence";
import { getProfileBadges } from "../../functions/getProfileBadges";
import { getUserPermissions } from "../../functions/getUserPermissions";
import globalConf from "../../globalConf";
import { Color, commands, selfclient } from "../../globals";
import { messages } from "../../messages";

commands.add({
  label: "user",
  name: "user",
  permissions: [Permissions.ADMINISTRATOR],
  run: async (context, args) => {
    const user = findUser(args.user || context.userId);
    if (!user)
      return await context.editOrReply(messages.targeting.not_found.user);

    const emb = new Embed();

    emb.setAuthor(user.toString(), user.avatarUrl ?? user.defaultAvatarUrl);
    emb.setThumbnail(user.avatarUrl ?? user.defaultAvatarUrl);
    emb.addField(
      `❯ User Info`,
      `${Emojis.GEAR} **󠇰ID**: \`${user.id}\`
${Emojis.LINK} **Profile**: ${user}
${Emojis.CALENDAR_SPIRAL} **Created**: ${simpleGetLongAgo(
        user.createdAtUnix
      )} ago ${formatTimestamp(user.createdAt)}
${
  user.bot ? CustomEmojis.GUI_SETTINGS : CustomEmojis.GUI_ROLE
} **Account Type**: ${user.bot ? `Bot` : `User`}`
    );

    var mem = context.message.guild?.members.cache.get(user.id) ?? false;
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
    console.log(
      bitfieldToArray(
        selfclient.users.get(user.id)?.publicFlags ?? 0,
        UserFlagArray
      )
    );
    const listedBadges = bitfieldToArray(
      selfclient.users.get(user.id)?.publicFlags ?? 0,
      UserFlagArray
    ).length
      ? await getProfileBadges(user)
      : [];
    listedBadges.push(
      ...(globalConf.badges[user.id] ?? []).map(
        (e) =>
          `[${e.icon}](https://arcy.gitbook.io/vybose/infos/profile-badges#${e.anchor})`
      )
    );
    var formed = listedBadges.join(" ");
    const connections = (
      await selfclient.users.get(user.id)?.fetchProfile()
    )?.connectedAccounts.toArray();
    const connections2 = connections?.map((e) => {
      const useLink = ![
        PlatformTypes.BATTLENET,
        PlatformTypes.CONTACTS,
        PlatformTypes.LEAGUE_OF_LEGENDS,
        PlatformTypes.SAMSUNG,
      ].includes(e.type);
      const ic = ConnectionMap.get(e.type)!;
      return useLink ? `[${ic?.icon}](${ic!.anchor}${e.name})` : ic!.icon;
    });

    if (connections2?.length) formed += "\n" + connections2.join(" ");
    if (formed.length) emb.setDescription(formed);
    console.log(emb);
    emb.setColor(Color.embed);
    context.editOrReply({
      embed: emb,
    });
  },
});
