import { Api } from "detritus-client-rest/lib/endpoints";
import { Context } from "detritus-client/lib/command";
import {
  HTTPMethods,
  PERMISSIONS_ALL_TEXT,
  PERMISSIONS_ALL_VOICE,
  PresenceStatuses,
} from "detritus-client/lib/constants";
import { Role, User } from "detritus-client/lib/structures";
import { Markup } from "detritus-client/lib/utils";
import { SomeRandomAPI } from "pariah";
import { Brand } from "../enums/brands";
import { CustomEmojis } from "../enums/customEmojis";
import { Emojis } from "../enums/emojis";
import {
  APIProfile,
  ConnectionMap,
  connectionUrls,
  guildVoiceRegionMap,
  IrrelevantPermissions,
  PermissionString,
  PresenceStatusColors,
  VoiceRegionString,
} from "../enums/utils";
import { createBrandEmbed, createImageEmbed } from "../functions/embed";
import globalConf from "../globalConf";
import { restSelfClient } from "../globals";
import {
  bitfieldToArray,
  capitalizeWords,
  formatTimestamp,
  getPresence,
  getProfileBadges,
  storeImage,
} from "./tools";
export enum Animals {
  BIRD = "bird",
  CAT = "cat",
  DOG = "dog",
  FOX = "fox",
  KANGAROO = "kangaroo",
  RED_PANDA = "redPanda",
  KOALA = "koala",
  PANDA = "panda",
  RACCOON = "raccoon",
}

export async function someRandomApiAnimal(context: Context, animal: Animals) {
  const embed = createBrandEmbed(Brand.SOME_RANDOM_API, context);

  const sra = new SomeRandomAPI();
  const animals = await sra[animal]();

  embed.setTitle(`${capitalizeWords(animal)} Image`);
  embed.setDescription(Markup.codeblock(animals.fact));
  embed.setImage(animals.link);

  return await context.editOrReply({ embed });
}

export enum Animus {
  WINK = "wink",
  PAT = "pat",
  HUG = "hug",
}

export async function someRandomApiAnimu(context: Context, animu: Animus) {
  const embed = createBrandEmbed(Brand.SOME_RANDOM_API, context);

  const sra = new SomeRandomAPI();
  const animus = await sra[animu]();

  embed.setTitle(`${capitalizeWords(animu)} Anime GIF`);
  embed.setImage(animus.link);

  return await context.editOrReply({ embed });
}
export async function infoUser(context: Context, user: User) {
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
                )!.icon
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

          if (member.voiceState.selfStream) state.push(CustomEmojis.GUI_STREAM);

          description.push(
            `${CustomEmojis.CHANNEL_VOICE} **Voice State**: ${state.join(" ")}`
          );
        }
      }
      {
        const permissions = bitfieldToArray(
          member.permissions,
          PermissionString
        );

        const textPermissions = permissions.filter((v) =>
          bitfieldToArray(PERMISSIONS_ALL_TEXT, PermissionString).includes(v)
        );
        if (textPermissions.length) {
          description.push(
            `${CustomEmojis.CHANNEL_THREAD} ${textPermissions
              .map((v) => Markup.codestring(capitalizeWords(v.toLowerCase())))
              .join(", ")}`
          );
        }

        const voicePermissions = permissions.filter((v) =>
          bitfieldToArray(PERMISSIONS_ALL_VOICE, PermissionString).includes(v)
        );
        if (voicePermissions.length) {
          description.push(
            `${CustomEmojis.CHANNEL_VOICE} ${voicePermissions
              .map((v) => Markup.codestring(capitalizeWords(v.toLowerCase())))
              .join(", ")}`
          );
        }

        const staffPermissions = permissions.filter(
          (v) => !IrrelevantPermissions.includes(v)
        );
        if (staffPermissions.length) {
          description.push(
            `${CustomEmojis.GUI_SETTINGS} ${staffPermissions
              .map((v) => Markup.codestring(capitalizeWords(v.toLowerCase())))
              .join(", ")}`
          );
        }
      }
      embed.addField("Member Info", description.join("\n"));
    }
  }
  return embed;
}
export enum Overlays {
  GAY = "/gay",
  GLASS = "/glass",
  WASTED = "/wasted",
  MISSION_PASSED = "/passed",
  JAIL = "/jail",
  COMRADE = "/comrade",
  TRIGGERED = "/triggered",
}
export enum Filters {
  GREYSCALE = "/greyscale",
  INVERT = "/invert",
  INVERT_GREYSCALE = "/invertgreyscale",
  BRIGHTNESS = "/brightness",
  THRESHOLD = "/threshold",
  SEPIA = "/sepia",
  RED = "/red",
  GREEN = "/green",
  BLOO = "/blue",
  BLURPLE = "/blurple",
  BLURPLE2 = "/blurple2",
  COLOR = "/color",
}
export enum Canvas {
  PIXELATE = "/pixelate",
  BLUR = "/blur",
  FAKE_YOUTUBE_COMMENT = "/youtube-comment",
  FAKE_TWEET = "/tweet",
  ITS_SO_STUPID = "/its-so-stupid",
  SIMPCARD = "/simpcard",
  HORNY = "/horny",
  LOLI_POLICE = "/lolice",
  COLOR_VIEWER = "/colorviewer",
}
export async function someRandomApiCanvas(
  context: Context,
  image: Buffer,
  endpoint: Overlays | Filters | Canvas,
  args: object
) {
  const sra = new SomeRandomAPI();
  const imageAttach = await storeImage(image, "attachment.gif");
  const a = Object.assign({ avatar: imageAttach.url! }, args);
  const canvas = await sra.canvas(endpoint, a);
  const embed = await createImageEmbed(context, canvas);
  return embed;
}
export async function someRandomApiOverlay(
  context: Context,
  image: Buffer,
  endpoint: Overlays
) {
  return await someRandomApiCanvas(context, image, endpoint, {});
}
export async function someRandomApiFilter(
  context: Context,
  image: Buffer,
  endpoint: Filters,
  args: object
) {
  return await someRandomApiCanvas(context, image, endpoint, args);
}
export async function someRandomApiCanvasMisc(
  context: Context,
  image: Buffer,
  endpoint: Canvas,
  args: object
) {
  return await someRandomApiCanvas(context, image, endpoint, args);
}
