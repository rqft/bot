import { Command, CommandClient } from "detritus-client";
import { HTTPMethods } from "detritus-client-rest/lib/constants";
import { Api } from "detritus-client-rest/lib/endpoints";
import {
  PERMISSIONS_ALL_TEXT,
  PERMISSIONS_ALL_VOICE,
  PresenceStatuses,
} from "detritus-client/lib/constants";
import { Role, User } from "detritus-client/lib/structures";
import { Brand } from "../../enums/brands";
import { CustomEmojis } from "../../enums/customEmojis";
import { Emojis } from "../../enums/emojis";
import {
  APIProfile,
  ConnectionMap,
  connectionUrls,
  guildVoiceRegionMap,
  IrrelevantPermissions,
  PermissionString,
  PresenceStatusColors,
  VoiceRegionString,
} from "../../enums/utils";
import { createBrandEmbed } from "../../functions/embed";
import { Markup } from "../../functions/markup";
import { DefaultParameters, Parameters } from "../../functions/parameters";
import {
  bitfieldToArray,
  capitalizeWords,
  formatTimestamp,
  getPresence,
  getProfileBadges,
} from "../../functions/tools";
import globalConf from "../../globalConf";
import { restSelfClient } from "../../globals";
import { BaseCommand } from "../basecommand";
export interface UserArgs {
  user: User;
}
export default class UserCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      label: "user",
      name: "guser",
      priority: 4587,
      type: Parameters.user,
      default: DefaultParameters.user,
    });
  }
  async run(context: Command.Context, args: UserArgs) {
    const { user } = args;
    const embed = createBrandEmbed(Brand.VYBOSE, context);

    embed.setTitle(user.toString()).setUrl(user.jumpLink);

    const profile: APIProfile = await restSelfClient.request({
      route: {
        method: HTTPMethods.GET,
        path: Api.USER_PROFILE,
        params: { userId: user.id },
      },
    });

    {
      const description: Array<string> = [];
      const customBadges = globalConf.badges[user.id] ?? [];
      const userBadges = await getProfileBadges(user);
      const userConnections = profile.connected_accounts.filter(
        (v) => v.type.toUpperCase() in connectionUrls
      );
      description.push(
        [
          customBadges.map((v) => v.icon).join(""),
          userBadges.map((v) => v.icon).join(""),
          userConnections
            .map(
              (v) =>
                `[${ConnectionMap.get(v.type)!.icon}](${connectionUrls[
                  v.type.toUpperCase()
                ]!(v)})`
            )
            .join(""),
        ].join("\n")
      );

      if (description.filter((v) => !!v.length).length)
        embed.setDescription(description.join("\n"));
    }

    {
      const description: Array<string> = [];

      description.push(`${CustomEmojis.GUI_RICH_PRESENCE} **ID**: ${user.id}`);

      description.push(
        `${Emojis.LINK} **Profile**: ${
          user.mention
        } ([Avatar](${user.avatarUrlFormat(null, { size: 1024 })}))`
      );

      description.push(
        `${Emojis.CALENDAR_SPIRAL} **Created**: ${formatTimestamp(
          user.createdAtUnix
        )}`
      );

      if (user.presence) {
        description.push(getPresence(user));
        embed.setColor(
          PresenceStatusColors[user.presence.status as PresenceStatuses]
        );
      }
      embed.addField("User Info", description.join("\n"));
    }
    if (context.guild) {
      const description: Array<string> = [];
      const member = context.guild.members.get(user.id);
      if (member) {
        description.push(
          `${Emojis.INBOX_TRAY} **Joined**: ${formatTimestamp(
            member.joinedAtUnix
          )}`
        );

        if (member.nick && member.nick.length > 0) {
          description.push(
            `${Emojis.NOTEPAD_SPIRAL} **Nickname**: ${Markup.escape.all(
              member.nick
            )}`
          );
        }

        if (member.premiumSince) {
          description.push(
            `${
              CustomEmojis.BADGE_SERVER_BOOSTER
            } **Boosting Since**: ${formatTimestamp(member.premiumSinceUnix)}`
          );
        }

        const roles = member.roles.filter((v) => v !== null) as Array<Role>;
        if (roles.length > 0) {
          if (roles.length < 20) {
            description.push(
              `${Emojis.SHIELD} **Roles (${roles.length})**: ${roles.map(
                (v) => v.mention
              )}`
            );
          } else {
            const keyRoles = roles.filter((v) => {
              const perms = bitfieldToArray(v.permissions, PermissionString);
              for (const k in perms) {
                if (IrrelevantPermissions.includes(k)) {
                  delete perms[k];
                }
              }
              return perms.length > 0;
            });
            description.push(
              `${Emojis.SHIELD} **Roles** (${member.roles.length})`
            );
            if (keyRoles.length < 20) {
              description.push(
                `${Emojis.SHIELD} **Key Roles (${
                  keyRoles.length
                })**: ${keyRoles.map((v) => v.mention)}`
              );
            } else {
              description.push(
                `${Emojis.SHIELD} **Key Roles (${keyRoles.length})**`
              );
            }
          }
        }
        {
          if (member.pending)
            description.push(`${Emojis.CLOCK330} **Pending**: Yes`);
          if (member.voiceState) {
            const state: Array<string> = [];
            if (member.voiceState.channel) {
              if (member.voiceState.channel.isGuildStageVoice)
                state.push(CustomEmojis.CHANNEL_STAGE);

              if (typeof member.voiceState.channel.rtcRegion === "string") {
                state.push(
                  guildVoiceRegionMap.get(
                    member.voiceState.channel.rtcRegion as VoiceRegionString
                  )?.icon!
                );
              }
            }

            if (member.voiceState.deaf || member.voiceState.selfDeaf)
              state.push(CustomEmojis.GUI_DEAFENED);
            else state.push(CustomEmojis.GUI_UNDEAFENED);

            if (
              member.voiceState.mute ||
              member.voiceState.selfMute ||
              member.voiceState.suppress
            )
              state.push(CustomEmojis.GUI_MUTED);
            else state.push(CustomEmojis.GUI_UNMUTED);

            if (member.voiceState.selfStream)
              state.push(CustomEmojis.GUI_STREAM);

            description.push(
              `${CustomEmojis.CHANNEL_VOICE} **Voice State**: ${state.join(
                " "
              )}`
            );
          }
        }
        {
          let permissions = bitfieldToArray(
            member.permissions,
            PermissionString
          );

          let textPermissions = permissions.filter((v) =>
            bitfieldToArray(PERMISSIONS_ALL_TEXT, PermissionString).includes(v)
          );
          if (textPermissions.length) {
            description.push(
              `${CustomEmojis.CHANNEL_THREAD} ${textPermissions.map((v) =>
                capitalizeWords(v.toLowerCase())
              )}`
            );
          }

          let voicePermissions = permissions.filter((v) =>
            bitfieldToArray(PERMISSIONS_ALL_VOICE, PermissionString).includes(v)
          );
          if (voicePermissions.length) {
            description.push(
              `${CustomEmojis.CHANNEL_VOICE} ${voicePermissions.map((v) =>
                capitalizeWords(v.toLowerCase())
              )}`
            );
          }

          let staffPermissions = permissions.filter(
            (v) => !IrrelevantPermissions.includes(v)
          );
          if (staffPermissions.length) {
            description.push(
              `${CustomEmojis.GUI_SETTINGS} ${staffPermissions.map((v) =>
                capitalizeWords(v.toLowerCase())
              )}`
            );
          }
        }
        embed.addField("Member Info", description.join("\n"));
      }
    }

    await context.editOrReply({ embed });
  }
}
