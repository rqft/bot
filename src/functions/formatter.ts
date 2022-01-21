import { Context } from "detritus-client/lib/command";
import {
  MarkupTimestampStyles,
  Permissions,
} from "detritus-client/lib/constants";
import { InteractionContext } from "detritus-client/lib/interaction";
import { User } from "detritus-client/lib/structures";
import { Markup } from "detritus-client/lib/utils";
import { Imagga, SomeRandomAPI } from "pariah";
import { Brand } from "../enums/brands";
import { CustomEmojis } from "../enums/customEmojis";
import { Emojis } from "../enums/emojis";
import { ConnectionMap, PermissionsText } from "../enums/utils";
import { createBrandEmbed, createImageEmbed } from "../functions/embed";
import { altclients, client, selfclient } from "../globals";
import { Secrets } from "../secrets";
import {
  bitfieldToArray,
  capitalizeWords,
  padCodeBlockFromRows,
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
  const sra = new SomeRandomAPI();
  const animals = await sra[animal]();
  const embed = await createImageEmbed(
    context,
    animals.link,
    animal,
    Brand.SOME_RANDOM_API
  );

  embed.setTitle(`${capitalizeWords(animal)} Image`);
  embed.setDescription(Markup.codeblock(animals.fact));

  return await context.editOrReply({ embed });
}

export enum Animus {
  WINK = "wink",
  PAT = "pat",
  HUG = "hug",
}

export async function someRandomApiAnimu(context: Context, animu: Animus) {
  const sra = new SomeRandomAPI();
  const animus = await sra[animu]();
  const embed = await createImageEmbed(
    context,
    animus.link,
    animu,
    Brand.SOME_RANDOM_API
  );

  embed.setTitle(`${capitalizeWords(animu)} Anime GIF`);

  return await context.editOrReply({ embed });
}
export async function infoUser(
  context: Context | InteractionContext,
  user: User
) {
  const embed = createBrandEmbed(Brand.VYBOSE, context);

  embed.setTitle(user.tag);

  const profile = await selfclient.rest.fetchUserProfile(user.id);

  {
    let avatar: string;
    if (user.avatar) {
      avatar = user.avatarUrlFormat(undefined, { size: 1024 });
    } else {
      avatar = user.defaultAvatarUrl;
    }
    embed.setThumbnail(avatar);
  }

  if (profile) {
    const description: Array<string> = [];
    if (profile.connectedAccounts.size > 0) {
      if (profile.connectedAccounts.size > 10) {
        description.push(
          `${Emojis.LINK} **Connected Accounts:** ${Array.from(
            new Set(
              profile.connectedAccounts.map((connection) => {
                const badge = ConnectionMap.get(connection.type);
                if (!badge) return "";
                return badge.icon;
              })
            )
          ).join("")}`
        );
      } else {
        description.push(
          `${Emojis.LINK} **Connected Accounts:** ${profile.connectedAccounts
            .map((connection) => {
              const badge = ConnectionMap.get(connection.type);
              if (!badge) return "";
              return `[${badge.icon}](${badge.anchor}${connection.name})`;
            })
            .join("")}`
        );
      }
    }
    if (profile.user.bio)
      description.push(
        `${Emojis.MEMO} **Bio:** ${Markup.codeblock(
          Markup.escape.codeblock(profile.user.bio)
        )}`
      );
    if (profile.premiumSince)
      description.push(
        `${CustomEmojis.BADGE_NITRO} **Premium Since:** ${Markup.timestamp(
          profile.premiumSince,
          MarkupTimestampStyles.BOTH_SHORT
        )}`
      );
    if (profile.premiumGuildSince)
      description.push(
        `${
          CustomEmojis.BADGE_SERVER_BOOSTER
        } **Boosting Since:** ${Markup.timestamp(
          profile.premiumGuildSince,
          MarkupTimestampStyles.BOTH_SHORT
        )}`
      );
    embed.addField("Profile Info", description.join("\n"));
  }

  {
    const description: Array<string> = [];
    description.push(`${Emojis.GEAR} **ID:** \`${user.id}\``);
    description.push(
      `${Emojis.LINK} **Profile**: ${user.tag} (${user.mention})`
    );
    description.push(
      `${Emojis.CALENDAR} **Created:** ${Markup.timestamp(
        user.createdAt,
        MarkupTimestampStyles.BOTH_SHORT
      )}`
    );

    {
      let tags: Array<string> = [];
      if (user.isSystem) tags.push("System Account");
      if (user.bot) {
        if (user.hasVerifiedBot) tags.push("Verified Bot");
        else tags.push("Bot");
      }
      if (user.isWebhook) tags.push("Webhook");
      if (user.isClientOwner) tags.push("Client Owner");
      if (tags.length)
        description.push(
          `${CustomEmojis.CHANNEL_STORE} **Tags:** ${tags.join(", ")}`
        );
    }

    embed.addField("User Info", description.join("\n"));
  }
  const irrelevantPermissions = [
    "CREATE_INSTANT_INVITE",
    "ADD_REACTIONS",
    "STREAM",
    "VIEW_CHANNEL",
    "SEND_MESSAGES",
    "SEND_TTS_MESSAGES",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "READ_MESSAGE_HISTORY",
    "USE_EXTERNAL_EMOJIS",
    "CONNECT",
    "SPEAK",
    "USE_VOICE_ACTIVITY",
    "CHANGE_NICKNAME",
    "VIEW_GUILD_INSIGHTS",
    "VIEW_AUDIT_LOG",
    "PRIORITY_SPEAKER",
    "USE_SLASH_COMMANDS",
    "REQUEST_TO_SPEAK",
    "USE_PUBLIC_THREADS",
    "USE_PRIVATE_THREADS",
  ];
  let member = context.guild ? context.guild.members.get(user.id) : undefined;
  if (member) {
    const description: Array<string> = [];
    description.push(
      `${Emojis.CALENDAR} **Joined:** ${Markup.timestamp(
        member.joinedAt,
        MarkupTimestampStyles.BOTH_SHORT
      )}`
    );

    if (member.nick)
      description.push(
        `${Emojis.MEMO} **Nickname:** \`${Markup.escape.codestring(
          member.nick
        )}\``
      );

    if (member.pending)
      description.push(`${Emojis.CLOCK} **Awaiting Approval:** Yes`);

    if (member.isBoosting) {
      description.push(
        `${
          CustomEmojis.BADGE_SERVER_BOOSTER
        } **Boosting Since:** ${Markup.timestamp(
          member.premiumSince,
          MarkupTimestampStyles.BOTH_SHORT
        )} (Boosted ${
          (await member.guild?.fetchPremiumSubscriptions())?.filter(
            (v) => v.userId === member!.id
          ).length
        } time(s))`
      );
    }

    if (member.roles.size > 0) {
      description.push(
        `\n${Emojis.SHIELD} **Role Count** (${member.roles.length})`
      );
      if (member.roles.size < 20) {
        description.push(
          `${Emojis.SHIELD} **Roles:** ${member.roles.map((v) => v?.mention)}`
        );
      } else {
        const keyroles = member.roles.filter((v) => {
          if (!v) return false;
          return (
            irrelevantPermissions.filter(
              (v2) =>
                !bitfieldToArray(
                  v.permissions,
                  Object.keys(Permissions)
                ).includes(v2)
            ).length > 0
          );
        });
        if (keyroles.length < 20)
          description.push(
            `${Emojis.SHIELD} **Key Roles:** ${keyroles.map((v) => v?.mention)}`
          );
        else
          description.push(
            `${Emojis.SHIELD} **Key Role Count** (${keyroles.length})`
          );
      }
    }

    if (member.voiceState) {
      const state = member.voiceState;
      const staty: Array<CustomEmojis> = [];
      if (state.isSpeaking) staty.push(CustomEmojis.STATUS_ONLINE);
      else staty.push(CustomEmojis.STATUS_OFFLINE);

      if (state.deaf || state.selfDeaf) staty.push(CustomEmojis.GUI_DEAFENED);
      if (state.mute || state.selfMute) staty.push(CustomEmojis.GUI_MUTED);
      if (state.selfStream) staty.push(CustomEmojis.GUI_STREAM);
      if (state.selfVideo) staty.push(CustomEmojis.GUI_VIDEO);

      description.push(
        `\n${Emojis.MICROPHONE} **Voice Status** ${staty.join(" ")}`
      );
    }
    {
      const permissions = bitfieldToArray<keyof typeof Permissions>(
        member.permissions,
        Object.keys(Permissions).slice(1) as Array<keyof typeof Permissions>
      ).filter((v) => !irrelevantPermissions.includes(v));

      if (permissions.length > 0) {
        description.push(
          `\n${Emojis.GEAR} **Permissions**: ${permissions
            .map((v) => PermissionsText[Permissions[v].toString()])
            .join(", ")}`
        );
      }
    }

    embed.addField("Member Info", description.join("\n"));
  }

  return embed;
}
export async function imageOcr(
  context: Context | InteractionContext,
  url: string
) {
  const im = new Imagga(Secrets.Key.imaggaAuth);
  const text = await im.text({ image_url: url });
  if (text.status.type === "error") throw new Error(text.status.text);
  if (!text.result.text.length) throw new Error("No text found");

  const embed = createBrandEmbed(Brand.IMAGGA, context);
  embed.setThumbnail(url);

  text.result.text.forEach((v, i) => {
    embed.addField(
      `Text ${i + 1}`,
      `Located At: (${v.coordinates.xmin}, ${v.coordinates.ymin})\nSize: ${
        v.coordinates.width
      }x${v.coordinates.height}\n${Markup.codeblock(v.data)}`
    );
  });

  return embed;
}
export async function imageTags(
  context: Context | InteractionContext,
  url: string
) {
  const im = new Imagga(Secrets.Key.imaggaAuth);

  const tags = await im.tags({ image_url: url, limit: 20 }, "");
  if (tags.status.type === "error") throw new Error(tags.status.text);

  const embed = createBrandEmbed(Brand.IMAGGA, context);
  embed.setThumbnail(url);
  embed.setDescription(
    Markup.codeblock(
      padCodeBlockFromRows([
        ["Tag", "Confidence"],
        ...tags.result.tags.map((v) => [v.tag.en, v.confidence.toFixed(3)]),
      ]).join("\n")
    )
  );

  return embed;
}
export async function textPing() {
  function emojiFromPing(ping: number) {
    if (ping > 5000) return "❌";
    if (ping > 1000) return "💤"; // zzz
    if (ping > 500) return "⚠️";
    return "✅";
  }

  const pings: Array<string> = [];
  for (let resty of [client, selfclient, ...altclients]) {
    const ping = await resty.ping();
    pings.push(
      `${emojiFromPing(ping.rest)} ${resty.user!.tag} (rest: ${
        ping.rest
      }ms, gateway: ${ping.gateway}ms)`
    );
  }
  return pings.join("\n");
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
  const embed = await createImageEmbed(
    context,
    canvas,
    undefined,
    Brand.SOME_RANDOM_API
  );
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
