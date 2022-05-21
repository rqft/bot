import { Utils } from "detritus-client";
import { Context } from "detritus-client/lib/command";
import {
  ChannelTypes,
  Permissions,
  UserFlags,
} from "detritus-client/lib/constants";
import {
  InteractionAutoCompleteContext,
  InteractionContext,
} from "detritus-client/lib/interaction";
import {
  Attachment,
  Channel,
  Member,
  Role,
  User,
} from "detritus-client/lib/structures";
import { Animation, load } from "imagescript/v2";
import { APIs, Pariah } from "pariah";
import {
  BooleanText,
  Brand,
  BrandColours,
  BrandIcons,
  BrandNames,
  ChannelTypesText,
  Colours,
  IrrelevantPermissions,
  PermissionsText,
  StagePrivacyLevelsText,
  UserBadges,
  VideoQualityModesText,
} from "../constants";
import { selfclient } from "../globals";
import { Secrets } from "../secrets";
import { Jonathan } from "./api";
import { CustomEmojis, Emojis } from "./emojis";
import { Err } from "./error";
import { Markdown } from "./markdown";
import { Paginator } from "./paginator";
import { Tags } from "./tags";
import {
  buildTimestampString,
  editOrReply,
  formatBytes,
  groupArray,
  mergeArrays,
  store,
} from "./tools";

export namespace Formatter {
  export namespace Basic {
    export function field(
      emoji: CustomEmojis | string,
      name: string | Markdown.Format,
      value: string | Markdown.Format
    ): string {
      return `${emoji} ${Markdown.Format.bold(name.toString())}: ${value}`;
    }
  }
  export namespace Embed {
    export function user(
      context: Context | InteractionContext,
      embed: Utils.Embed = new Utils.Embed()
    ) {
      embed.setAuthor(
        context.user.tag,
        context.user.avatarUrl,
        context.user.jumpLink
      );
      embed.setColor(Colours.EMBED);
      return embed;
    }
    export function brand(
      context: Context | InteractionContext,
      brand?: Brand,
      embed: Utils.Embed = new Utils.Embed()
    ) {
      const self = user(context, embed);
      if (brand) {
        self.setFooter(`${BrandNames[brand]}`, BrandIcons[brand]!.toString());
        self.setColor(BrandColours[brand]!);
      }
      return self;
    }
    export async function image(
      context: Context | InteractionContext,
      input: URL | string | Buffer | Attachment | ArrayBuffer,
      name: string,
      brand?: Brand
    ) {
      if (input instanceof ArrayBuffer) {
        const buf = Buffer.alloc(input.byteLength);
        const view = new Uint8Array(input);
        for (let index = 0; index < buf.length; ++index) {
          buf[index] = view[index]!;
        }
        input = buf;
      }

      if (input instanceof Attachment) {
        input = input.url!;
      }

      if (typeof input === "string") {
        input = new URL(input);
      }

      if (input instanceof URL) {
        input = await new Pariah(input).arrayBuffer("/");
      }

      const image = await store(input as Buffer, name);
      if (!image.url) {
        throw new Err("Failed to store image");
      }

      const embed = Embed.brand(context, brand);
      const footer = [image.filename];

      const imagescript = load(input);
      if (imagescript instanceof Animation) {
        footer.push(`${imagescript.frames.length} frames`);
      }

      if (image.size) {
        footer.push(
          `${image.width}x${image.height} (${formatBytes(image.size, 2, true)})`
        );
      }

      embed.setFooter(footer.join(", "));
      embed.setImage(image.url!);

      return embed;
    }
    export function card(
      _context: Context | InteractionContext,
      text: string,
      embed: Utils.Embed = new Utils.Embed()
    ) {
      embed.setColor(Colours.EMBED);
      embed.setDescription(text);
      return embed;
    }
  }
  export namespace SomeRandomApi {
    export const instance = new APIs.SomeRandomApi.API();
    export const BannedImageOps: Array<APIs.SomeRandomApi.Canvas> = [
      APIs.SomeRandomApi.CanvasMisc.COLOR_VIEWER,
      APIs.SomeRandomApi.CanvasMisc.FAKE_TWEET,
      APIs.SomeRandomApi.CanvasMisc.FAKE_YOUTUBE_COMMENT,
      APIs.SomeRandomApi.CanvasMisc.HEX_TO_RGB,
      APIs.SomeRandomApi.CanvasFilter.COLOR,
    ];

    export const CanvasMethods = mergeArrays<APIs.SomeRandomApi.Canvas>(
      Object.values(APIs.SomeRandomApi.CanvasFilter),
      Object.values(APIs.SomeRandomApi.CanvasMisc),
      Object.values(APIs.SomeRandomApi.CanvasOverlay)
    ).filter((b) => !BannedImageOps.includes(b));

    export interface CanvasArgs {
      method: APIs.SomeRandomApi.Canvas;
      target: string;
      [key: string]: unknown;
    }
    export async function canvas(
      context: Context | InteractionContext,
      args: CanvasArgs
    ) {
      if (!args.target) {
        throw new Err("Can't find any images");
      }

      if (!args.method) {
        throw new Err("No canvas method specified");
      }

      if (!CanvasMethods.includes(args.method)) {
        throw new Err(`Canvas method "${args.method}" is not supported.`);
      }
      args.target = args.target.replace(/\.(gif|webp)/i, '.png')
      
      const data = await instance.canvas(args.method, args.target, args);
      
      const embed = await Formatter.Embed.image(
        context,
        data,
        `${args.method}.png`
      );
      return await editOrReply(context, { embed });
    }
    export const AnimalMethods = Object.values(APIs.SomeRandomApi.Animals);
    export const ImageOnlyAnimals = [
      APIs.SomeRandomApi.Animals.WHALE,
      APIs.SomeRandomApi.Animals.PIKACHU,
    ];
    export interface AnimalArgs {
      animal: APIs.SomeRandomApi.Animals;
    }
    export async function animal(
      context: Context | InteractionContext,
      args: AnimalArgs
    ) {
      const onlyImage = ImageOnlyAnimals.includes(args.animal);
      const data: any = onlyImage
        ? await instance.get.json("/img/:animal", {
            ":animal": args.animal,
          })
        : await instance.animal(args.animal);
      const embed = await Formatter.Embed.image(
        context,
        data.image,
        `${args.animal}.png`
      );
      if ("fact" in data) {
        embed.setDescription(data.fact);
      }
      return await editOrReply(context, { embed });
    }
  }
  export namespace Info {
    export interface UserArgs {
      user: User | Member;
    }
    export async function user(
      context: Context | InteractionContext,
      args: UserArgs
    ) {
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
            "\n" +
              description.push(
                Basic.field(CustomEmojis.CHANNEL_STORE, "Tags", tags.join(", "))
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
            description.push(
              Basic.field(Emojis.PENCIL, "Nickname", member.nick)
            );
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
            const subscriptions =
              await context.guild?.fetchPremiumSubscriptions();
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

              if (
                voiceState.mute ||
                voiceState.selfMute ||
                voiceState.suppress
              ) {
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
                    Basic.field(
                      Emojis.MICROPHONE,
                      "Voice State",
                      state.join(" ")
                    )
                );
              }
            }

            {
              const permissions: Array<bigint> = [];
              for (const key in Permissions) {
                const permission =
                  Permissions[key as keyof typeof Permissions]!;
                if (IrrelevantPermissions.includes(permission)) {
                  continue;
                }
                if (PermissionsText[String(permission)]) {
                  if (member.can(permission)) {
                    permissions.push(permission);
                  }
                }
              }
              if (permissions.length) {
                description.push(
                  "\n" +
                    Basic.field(
                      Emojis.LOCK,
                      "Permissions",
                      permissions
                        .map(
                          (permission) => PermissionsText[String(permission)]
                        )
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

    export interface ChannelArgs {
      channel: Channel;
    }

    export async function channel(
      context: Context | InteractionContext,
      args: ChannelArgs
    ) {
      const { channel } = args;
      const embed = Embed.user(context);

      embed.setTitle("#" + channel.name);
      embed.setUrl(channel.jumpLink);

      if (channel.topic) {
        embed.setDescription(channel.topic);
      }

      {
        const description: Array<string> = [];
        description.push(
          Basic.field(Emojis.GEAR, "ID", Markdown.Format.codestring(channel.id))
        );

        description.push(
          Basic.field(
            Emojis.LINK,
            "Profile",
            `${Markdown.Format.link(`#${channel.name}`, channel.jumpLink)} (${
              channel.mention
            })`
          )
        );

        description.push(
          Basic.field(
            Emojis.CALENDAR,
            "Created At",
            buildTimestampString(channel.createdAtUnix)
          )
        );

        if (channel.position) {
          description.push(
            Basic.field(
              Emojis.BOOKMARK_TABS,
              "Position",
              Markdown.Format.codestring(channel.position.toLocaleString())
            )
          );
        }

        if (channel.parent) {
          description.push(
            Basic.field(
              CustomEmojis.CHANNEL_CATEGORY,
              "Category",
              `${Markdown.Format.link(
                `#${channel.parent.name}`,
                channel.parent.jumpLink
              )} (${channel.parent.mention})`
            )
          );
        }

        if (channel.guild) {
          description.push(
            Basic.field(
              Emojis.SHIELD,
              "Server",
              `${Markdown.Format.link(
                channel.guild.name,
                channel.guild.jumpLink
              )} (${Markdown.Format.codestring(channel.guild.id)})`
            )
          );
        }

        embed.addField("Channel Info", description.join("\n"));
      }

      {
        const description: Array<string> = [];
        switch (channel.type) {
          case ChannelTypes.DM:
          case ChannelTypes.GROUP_DM:
          case ChannelTypes.GUILD_NEWS:
          case ChannelTypes.GUILD_NEWS_THREAD:
          case ChannelTypes.GUILD_PRIVATE_THREAD:
          case ChannelTypes.GUILD_PUBLIC_THREAD:
          case ChannelTypes.GUILD_TEXT: {
            if (channel.nsfw) {
              description.push(
                Basic.field(Emojis.WARNING, "NSFW", BooleanText(channel.nsfw))
              );
            }

            if (channel.rateLimitPerUser) {
              description.push(
                Basic.field(
                  CustomEmojis.GUI_SLOWMODE,
                  "Slowmode",
                  Markdown.toTimeString(channel.rateLimitPerUser * 1000)
                )
              );
            }

            if (channel.lastMessage) {
              description.push(
                Basic.field(
                  CustomEmojis.CHANNEL_THREAD,
                  "Last Message",
                  buildTimestampString(channel.lastMessage.createdAtUnix)
                )
              );

              description.push(
                Basic.field(
                  CustomEmojis.BLANK,
                  "-> Jump Link",
                  Markdown.Format.link("#" + channel.name, channel.jumpLink)
                )
              );
            }

            if (channel.lastPinTimestampUnix) {
              description.push(
                Basic.field(
                  CustomEmojis.GUI_PINS,
                  "Last Pinned Message",
                  buildTimestampString(channel.lastPinTimestampUnix)
                )
              );
            }

            if (channel.owner) {
              description.push(
                Basic.field(
                  CustomEmojis.GUI_OWNERCROWN,
                  "Owner",
                  `${Markdown.Format.link(
                    channel.owner.tag,
                    channel.owner.jumpLink
                  )} (${channel.owner.mention})`
                )
              );
            }

            if (channel.recipients) {
              Basic.field(
                CustomEmojis.GUI_MEMBERS,
                "Recipients",
                channel.recipients.size.toLocaleString()
              );
            }

            break;
          }
          case ChannelTypes.GUILD_STAGE_VOICE:
          case ChannelTypes.GUILD_VOICE: {
            description.push(
              Basic.field(
                CustomEmojis.CHANNEL_VOICE,
                "Bitrate",
                `${formatBytes(
                  channel.bitrate || 0,
                  undefined,
                  undefined,
                  true
                )}/second`
              )
            );

            description.push(
              Basic.field(
                CustomEmojis.GUI_MEMBERS,
                "User Limit",
                `${channel.voiceStates}/${channel.userLimit}`
              )
            );

            if (channel.videoQualityMode) {
              description.push(
                Basic.field(
                  CustomEmojis.GUI_VIDEO,
                  "Video Quality",
                  VideoQualityModesText[channel.videoQualityMode]
                )
              );
            }

            if (channel.stageInstance) {
              description.push(
                Basic.field(
                  Emojis.WARNING,
                  "Privacy",
                  StagePrivacyLevelsText[channel.stageInstance.privacyLevel]
                )
              );
              description.push(
                Basic.field(
                  CustomEmojis.GUI_MEMBERS,
                  "Moderators",
                  channel.stageInstance.moderators.size.toLocaleString()
                )
              );
              description.push(
                Basic.field(
                  Emojis.MICROPHONE,
                  "Speakers",
                  channel.stageInstance.speakers.size.toLocaleString()
                )
              );
              description.push(
                Basic.field(
                  Emojis.WAVE,
                  "Listeners",
                  channel.stageInstance.listeners.size.toLocaleString()
                )
              );
            }

            break;
          }

          case ChannelTypes.GUILD_CATEGORY: {
            description.push(
              Basic.field(
                CustomEmojis.CHANNEL_CATEGORY,
                "Children",
                channel.children.size.toLocaleString()
              )
            );
            break;
          }

          case ChannelTypes.GUILD_DIRECTORY: {
            break;
          }

          case ChannelTypes.GUILD_FORUM: {
            if (channel.defaultAutoArchiveDuration) {
              description.push(
                Basic.field(
                  CustomEmojis.GUI_SLOWMODE,
                  "Default Auto Archive Duration",
                  buildTimestampString(channel.defaultAutoArchiveDuration)
                )
              );
            }

            if (channel.template) {
              description.push(
                Basic.field(
                  CustomEmojis.GUI_RICH_PRESENCE,
                  "Template",
                  Markdown.Format.codestring(channel.template)
                )
              );
            }

            if (channel.availableTags.size) {
              description.push(
                Basic.field(
                  CustomEmojis.CHANNEL_STORE,
                  "Available Tags",
                  channel.availableTags
                    .map((x) => {
                      const title = Markdown.Format.codestring(
                        x.emojiId
                          ? x.name
                          : `${x.emojiName} ${Markdown.Format.codestring(
                              x.name
                            )}`
                      );
                      if (x.emojiId) {
                        return `<:${x.emojiName}:${x.emojiId}> ${title}`;
                      } else {
                        return title;
                      }
                    })
                    .join(", ")
                )
              );
            }

            break;
          }
        }

        if (description.length) {
          embed.addField(
            `${ChannelTypesText[channel.type]} Info`,
            description.join("\n")
          );
        }
      }

      return await editOrReply(context, { embed });
    }
  }
  export namespace Tag {
    export const instance = new Jonathan.API(Secrets.ApiToken);

    export interface GetTagArgs {
      key: string;
      args: Array<string>;
    }
    export async function get(
      context: Context | InteractionContext,
      args: GetTagArgs
    ) {
      const tag = await instance.tagGet(args.key);
      if (tag.status.state === "error") {
        throw new Err(tag.status.message, { status: tag.status.code });
      }

      const output = await Tags.exec(context, tag.data, args.args);
      if (!output.text) {
        output.text = "\u200b";
      }

      return await editOrReply(context, {
        content: output.text,
        attachments: output.files,
      });
    }

    export interface PostTagArgs {
      key: string;
      value: string;
    }
    export async function post(
      context: Context | InteractionContext,
      args: PostTagArgs
    ) {
      const original = await instance.tagGet(args.key);
      if (original.status.state === "ok" && original.data === args.value) {
        throw new Err("tag already has that value");
      }

      const tag = await instance.tagPost(args.key, args.value);

      if (tag.status.state === "error") {
        throw new Err(tag.status.message, { status: tag.status.code });
      }

      const description = ["ok, i set that tag :D"];
      if (original.data !== null) {
        description.push(
          `original value: ${Markdown.Format.codeblock(original.data)}`
        );
      }
      description.push(`new value: ${Markdown.Format.codeblock(args.value)}`);

      return await editOrReply(context, description.join("\n"));
    }

    export async function remove(
      context: Context | InteractionContext,
      args: GetTagArgs
    ) {
      const tag = await instance.tagDelete(args.key);
      if (tag.status.state === "error") {
        throw new Err(tag.status.message, { status: tag.status.code });
      }

      return await editOrReply(context, "ok, i deleted that tag :)");
    }

    export async function list(context: Context | InteractionContext) {
      const tags = await instance.tagList();
      if (tags.status.state === "error") {
        throw new Err(tags.status.message, { status: tags.status.code });
      }

      const slices = groupArray(tags.data, 100);

      const paginator = new Paginator(context, {
        pageLimit: slices.length,
        onPage(page: number) {
          const slice = slices[page - 1]!;
          const embed = Embed.user(context);
          embed.setDescription(
            `Count: ${tags.data.length}\n` +
              Markdown.Format.codeblock(slice.join(", ")).toString()
          );
          return embed;
        },
      });

      return await paginator.start();
    }

    export async function inspect(context: Context | InteractionContext) {
      const tags = await instance.tagInspect();
      if (tags.status.state === "error") {
        throw new Err(tags.status.message, { status: tags.status.code });
      }

      return await editOrReply(context, {
        files: [{ value: tags.data, filename: "data.json" }],
      });
    }

    export async function search(context: InteractionAutoCompleteContext) {
      const tags = await instance.tagSearch(context.value);

      // never
      if (tags.status.state === "error") {
        return await context.respond({ content: ":(" });
      }

      return await context.respond({ choices: tags.data });
    }
  }
  export interface CodeArgs {
    code: Markdown.TextCodeblockMatch;
    "json-spacing": number;
  }
  export async function code(
    context: Context | InteractionContext,
    args: CodeArgs
  ) {
    if (!context.client.isOwner(context.userId)) {
      throw new Err("no", { status: 403 });
    }
    const text = args.code.text;
    let language = args.code.language || "ts";
    let message: any;
    try {
      message = await Promise.resolve(eval(text));

      if (typeof message === "object") {
        message = JSON.stringify(message, null, args["json-spacing"]);
        language = "json";
      }
    } catch (error) {
      message =
        error instanceof Error
          ? error.stack || error.message
          : error instanceof Err
          ? error.toString()
          : error;
    }

    message = String(message);

    return await editOrReply(
      context,
      Markdown.Format.codeblock(message, language).toString()
    );
  }
}
