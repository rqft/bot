import { Context } from "detritus-client/lib/command";
import { UserFlags } from "detritus-client/lib/constants";
import { InteractionContext } from "detritus-client/lib/interaction";
import { Member, Message, Role, User } from "detritus-client/lib/structures";
import {
  IrrelevantPermissions,
  PermissionsText,
  UserBadges,
} from "../../constants";
import { selfclient } from "../../globals";
import { CustomEmojis, Emojis } from "../emojis";
import { Markdown } from "../markdown";
import { buildTimestampString, editOrReply } from "../tools";
import { Basic } from "./basic";
import { Embed } from "./embed";
export interface UserArgs {
  user: User | Member;
}
export async function user(
  context: Context | InteractionContext,
  args: UserArgs
): Promise<Message | null> {
  const embed = Embed.user(context);
  const { user } = args;

  embed.setTitle(user.tag);

  const profile = await selfclient.rest.fetchUserProfile(user.id);
  embed.setThumbnail(profile.user.avatarUrl);

  if (profile) {
    const description: Array<string> = [];

    if (profile.user.bio) {
      description.push(
        Basic.field(
          Emojis.MEMO,
          "Bio",
          Markdown.Format.codeblock(profile.user.bio)
        )
      );
    }

    if (profile.premiumSinceUnix) {
      description.push(
        Basic.field(
          Emojis.STAR,
          "Has had nitro since",
          buildTimestampString(profile.premiumSinceUnix)
        )
      );
    }

    if (profile.premiumGuildSinceUnix) {
      description.push(
        Basic.field(
          Emojis.STAR,
          "Has boosted a server since",
          buildTimestampString(profile.premiumGuildSinceUnix)
        )
      );
    }
    if (description.length) {
      embed.addField("User Profile", description.join("\n"));
    }
  }

  {
    const description: Array<string> = [];

    description.push(
      Basic.field(Emojis.GEAR, "ID", Markdown.Format.codestring(user.id))
    );
    description.push(
      Basic.field(
        Emojis.LINK,
        "Profile",
        `${Markdown.Format.link(user.tag, user.jumpLink)} (${user.mention})`
      )
    );

    description.push(
      Basic.field(
        Emojis.CALENDAR,
        "Created At",
        buildTimestampString(user.createdAtUnix)
      )
    );

    {
      const tags: Array<string> = [];
      if (user.isSystem) {
        tags.push("System");
      }
      if (user.bot) {
        if (user.hasVerifiedBot) {
          tags.push("Verified Bot");
        }
        tags.push("Bot");
      }

      if (user.isWebhook) {
        tags.push("Webhook");
      }

      if (user.isClientOwner) {
        tags.push("Client Owner");
      }

      if (tags.length) {
        description.push(
          Basic.field(
            "\n" + CustomEmojis.CHANNEL_STORE,
            "Tags",
            tags.join(", ")
          )
        );
      }
    }

    const flags = [];
    for (const flag of Object.values(UserFlags)) {
      if (typeof flag === "string") {
        continue;
      }
      if (user.hasFlag(flag)) {
        flags.push(UserBadges[flag]);
      }
    }

    if (flags.length) {
      description.push(
        Basic.field(Emojis.NOTEPAD_SPIRAL, "Badges", flags.join(""))
      );
    }

    if (description.length) {
      embed.addField("User Info", description.join("\n"));
    }
  }

  if (context.guild) {
    const member = context.guild.members.get(user.id);
    if (member) {
      const description: Array<string> = [];
      if (member.nick) {
        description.push(Basic.field(Emojis.PENCIL, "Nickname", member.nick));
      }

      if (member.joinedAtUnix) {
        description.push(
          Basic.field(
            Emojis.CALENDAR,
            "Joined At",
            buildTimestampString(member.joinedAtUnix)
          )
        );
      }

      if (member.isBoosting) {
        const subscriptions = await context.guild?.fetchPremiumSubscriptions();
        const fromUser = subscriptions.filter(
          (subscription) => subscription.user!.id === user.id
        );
        description.push(
          Basic.field(
            Emojis.STAR,
            "Boosting Since",
            `${Markdown.Format.timestamp(member.premiumSince!)} (${
              fromUser.length
            } ${fromUser.length === 1 ? "boost" : "boosts"})`
          )
        );
      }

      if (member.roles.size) {
        description.push(
          "\n" +
            Basic.field(
              CustomEmojis.GUI_ROLE,
              "Role Count",
              String(member.roles.size)
            )
        );
        if (member.roles.size > 0) {
          if (member.roles.size <= 20) {
            description.push(
              Basic.field(
                CustomEmojis.GUI_ROLE,
                "Roles",
                member.roles.map((role) => role!.mention).join(", ")
              )
            );
          } else {
            const keyRoles: Array<Role> = [];
            for (const [, role] of member.roles) {
              for (const permission of IrrelevantPermissions) {
                if (role!.can(permission)) {
                  continue;
                }
              }
              keyRoles.push(role!);
            }

            if (keyRoles.length <= 20) {
              description.push(
                Basic.field(
                  CustomEmojis.GUI_ROLE,
                  "Key Roles",
                  keyRoles.map((role) => role!.mention).join(", ")
                )
              );
            } else {
              description.push(
                Basic.field(
                  CustomEmojis.GUI_ROLE,
                  "Key Role Count",
                  String(keyRoles.length)
                )
              );
            }
          }
        }

        if (member.voiceState) {
          const { voiceState } = member;
          const state: Array<CustomEmojis | Emojis> = [];
          if (voiceState.isSpeaking) {
            state.push(CustomEmojis.STATUS_ONLINE);
          } else {
            state.push(CustomEmojis.STATUS_OFFLINE);
          }

          if (voiceState.deaf || voiceState.selfDeaf) {
            state.push(CustomEmojis.GUI_DEAFENED);
          } else {
            state.push(CustomEmojis.GUI_UNDEAFENED);
          }

          if (voiceState.mute || voiceState.selfMute || voiceState.suppress) {
            state.push(CustomEmojis.GUI_MUTED);
          } else {
            state.push(CustomEmojis.GUI_UNMUTED);
          }

          if (voiceState.selfStream) {
            state.push(CustomEmojis.GUI_STREAM);
          }

          if (voiceState.selfVideo) {
            state.push(CustomEmojis.GUI_VIDEO);
          }

          if (voiceState.requestToSpeakTimestamp) {
            state.push(Emojis.WAVE);
          }

          if (state.length) {
            description.push(
              "\n" +
                Basic.field(Emojis.MICROPHONE, "Voice State", state.join(" "))
            );
          }
        }

        {
          const permissions = Basic.permissionsList(member);
          if (permissions.length) {
            description.push(
              "\n" +
                Basic.field(
                  Emojis.LOCK,
                  "Permissions",
                  permissions
                    .map((permission) => PermissionsText[String(permission)])
                    .join(", ")
                )
            );
          }
        }
      }

      if (description.length) {
        embed.addField("Member Info", description.join("\n"));
      }
    }
  }

  return await editOrReply(context, { embed });
}
