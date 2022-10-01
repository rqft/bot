"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.role = exports.customEmoji = exports.unicodeEmoji = exports.snowflake = exports.isSnowflake = exports.identify = void 0;
const constants_1 = require("detritus-client/lib/constants");
const structures_1 = require("detritus-client/lib/structures");
const utils_1 = require("detritus-client/lib/utils");
const constants_2 = require("../constants");
const embed_1 = require("../tools/embed");
const emoji_1 = require("../tools/emoji");
const paginator_1 = require("../tools/paginator");
const util_1 = require("../tools/util");
const warning_1 = require("../tools/warning");
const builder_1 = require("../wrap/builder");
exports.default = (0, builder_1.Command)("info [noun?]", { args: (self) => ({ noun: self.stringOptional() }) }, async (context, args) => {
    console.log("a");
    args.noun ||= context.userId;
    const { noun } = args;
    const pages = identify(context, noun);
    if (!pages.length) {
        throw new warning_1.Warning("Nothing was found");
    }
    const paginator = new paginator_1.Paginator(context, {
        pageLimit: pages.length,
        async onPage(page) {
            const embed = embed_1.Embeds.user(context);
            const data = pages[page - 1];
            if (isSnowflake(data)) {
                return await snowflake(context, data, embed);
            }
            if (data instanceof emoji_1.UnicodeEmoji) {
                return await unicodeEmoji(context, data, embed);
            }
            if (data instanceof emoji_1.CustomEmoji) {
                return await customEmoji(context, data, embed);
            }
            if (data instanceof structures_1.Role) {
                return await role(context, data, embed);
            }
            embed.setTitle(`${constants_2.tail} ${data.constructor.name} Information`);
            embed.setDescription("No further details.");
            return embed;
        },
    });
    return await paginator.start();
});
function identify(context, noun) {
    const out = [];
    if (/^<a?:(\w{2,32}):(\d{16,20})>$/.test(noun)) {
        out.push(new emoji_1.CustomEmoji(noun));
    }
    const cemoji = context.client.emojis.filter((x) => x.name.toLowerCase() === noun.toLowerCase() ||
        x.id === noun.replace(/\D/g, ""));
    if (cemoji.length) {
        out.push(...cemoji.map((x) => new emoji_1.CustomEmoji(x.format)));
    }
    const uemoji = constants_2.emojis.filter((x) => x.name.toLowerCase() === noun.toLowerCase() || x.emoji === noun);
    if (uemoji.length) {
        out.push(...uemoji.map((x) => new emoji_1.UnicodeEmoji(x.emoji)));
    }
    const user = context.client.users.find((x) => x.tag.toLowerCase() === noun.toLowerCase() ||
        x.id === noun.replace(/\D/g, ""));
    a: if (user) {
        if (context.guild) {
            if (context.guild.members.has(user.id)) {
                out.push(context.guild.members.get(user.id));
                break a;
            }
        }
        out.push(user);
    }
    const channels = context.client.channels.filter((x) => x.id === noun.replace(/\D/g, "") ||
        "#" + x.name.toLowerCase() === noun.toLowerCase());
    if (channels.length) {
        out.push(...channels);
    }
    const roles = context.client.roles.filter((x) => x.id === noun.replace(/\D/g, "") ||
        (x.id === context.guildId && noun === "@everyone") ||
        x.name.toLowerCase() === noun.toLowerCase());
    if (roles.length) {
        out.push(...roles);
    }
    const guilds = context.client.guilds.filter((x) => x.id === noun.replace(/\D/g, "") ||
        x.name.toLowerCase() === noun.toLowerCase());
    if (guilds.length) {
        out.push(...guilds);
    }
    if (/\d{16,21}/g.test(noun)) {
        out.push(Object.assign(utils_1.Snowflake.deconstruct(noun), {
            species: "@data/snowflake",
        }));
    }
    console.log(out);
    return out;
}
exports.identify = identify;
function isSnowflake(value) {
    return value["species"] === "@data/snowflake";
}
exports.isSnowflake = isSnowflake;
async function snowflake(_, data, embed) {
    embed.setTitle(`${constants_2.tail} Snowflake Information`);
    {
        const description = [];
        const { id, processId, sequence, timestamp, workerId } = data;
        description.push((0, util_1.fmt)("**Id**: `{id}`", { id }));
        description.push((0, util_1.fmt)("**Process Id**: `{processId}`", { processId }));
        description.push((0, util_1.fmt)("**Sequence**: `{sequence}`", { sequence }));
        description.push((0, util_1.fmt)("**Timestamp**: {f} ({r})", {
            f: utils_1.Markup.timestamp(timestamp, constants_1.MarkupTimestampStyles.BOTH_SHORT),
            r: utils_1.Markup.timestamp(timestamp, constants_1.MarkupTimestampStyles.RELATIVE),
        }));
        description.push((0, util_1.fmt)("{tab} {derive} **Unix**: `{timestamp}`", { timestamp, tab: constants_2.tab, derive: constants_2.derive }));
        description.push((0, util_1.fmt)("**Worker Id**: {workerId}", { workerId }));
        embed.setDescription(description.join("\n"));
    }
    embed.setThumbnail(new emoji_1.UnicodeEmoji("❄").url());
    return embed;
}
exports.snowflake = snowflake;
async function unicodeEmoji(_, data, embed) {
    embed.setTitle(`${constants_2.tail} Emoji Information (Unicode)`);
    embed.setThumbnail(data.url());
    const { category, keywords, name, sub_category, children } = data.info();
    {
        const description = [];
        description.push((0, util_1.fmt)("**Name**: `{name}`", { name }));
        description.push((0, util_1.fmt)("**Category**: {category}: {sub}", {
            category: category.name,
            sub: sub_category.name,
        }));
        description.push((0, util_1.fmt)("**Codepoints**: `{codepoints}`", { codepoints: data.codepoints() }));
        if (keywords && keywords.length) {
            description.push((0, util_1.fmt)("**Key Words**: {kw}", {
                kw: keywords.map((x) => utils_1.Markup.codestring(x)).join(", "),
            }));
        }
        embed.setDescription(description.join("\n"));
    }
    if (children && children.length) {
        embed.addField(`${constants_2.tail} Children`, children.map((x) => `${x.emoji} ${x.name}`).join("\n"));
    }
    return embed;
}
exports.unicodeEmoji = unicodeEmoji;
async function customEmoji(_, data, embed) {
    embed.setTitle(`${constants_2.tail} Emoji Information (Custom)`);
    embed.setThumbnail(data.url());
    {
        const description = [];
        description.push((0, util_1.fmt)("**Id**: `{id}`", { id: data.id }));
        description.push((0, util_1.fmt)("**Name**: [{name}]({url})", { name: data.name, url: data.url() }));
        if (data.animated) {
            description.push("**Animated**: Yes");
        }
        const unix = utils_1.Snowflake.timestamp(data.id);
        description.push((0, util_1.fmt)("**Created**: {f} ({r})", {
            f: utils_1.Markup.timestamp(unix, constants_1.MarkupTimestampStyles.BOTH_SHORT),
            r: utils_1.Markup.timestamp(unix, constants_1.MarkupTimestampStyles.RELATIVE),
        }));
        const discord = data.data();
        if (discord) {
            if (discord.guild) {
                description.push((0, util_1.fmt)("**Server**: [{guild}]({url})", {
                    guild: discord.guild.name,
                    url: discord.guild.jumpLink,
                }));
            }
        }
        embed.setDescription(description.join("\n"));
    }
    return embed;
}
exports.customEmoji = customEmoji;
async function role(_, data, embed) {
    embed.setTitle(`${constants_2.tail} Role Information`);
    const { id, color, createdAtUnix, name, managed, isBoosterRole, isDefault, hoist, mentionable, } = data;
    {
        const description = [];
        description.push((0, util_1.fmt)("**Name**: {name}", { name: utils_1.Markup.codestring(name) }));
        description.push((0, util_1.fmt)("**Id**: `{id}`", { id }));
        if (color) {
            const hex = color.toString(16).padStart(6);
            description.push((0, util_1.fmt)("**Color**: `#{color}`", { color: hex }));
            embed.setThumbnail((0, util_1.fmt)("https://api.clancy.lol/image/color/256x256/{hex}", { hex }));
        }
        description.push((0, util_1.fmt)("**Created**: {f} ({r})", {
            f: utils_1.Markup.timestamp(createdAtUnix, constants_1.MarkupTimestampStyles.BOTH_SHORT),
            r: utils_1.Markup.timestamp(createdAtUnix, constants_1.MarkupTimestampStyles.RELATIVE),
        }));
        description.push((0, util_1.fmt)("**Server**: [{guild}]({guildUrl})", {
            guild: data.guild?.name,
            guildUrl: data.guild?.jumpLink,
        }));
        const tags = [];
        if (managed) {
            tags.push("Managed");
        }
        if (isBoosterRole) {
            tags.push("Booster Role");
        }
        if (isDefault) {
            tags.push("Default Role");
        }
        if (hoist) {
            tags.push("Hoisted");
        }
        if (mentionable) {
            tags.push("Mentionable");
        }
        if (tags.length) {
            description.push((0, util_1.fmt)("**Tags**: {tags}", { tags: tags.join(", ") }));
        }
        embed.setDescription(description.join("\n"));
    }
    return embed;
}
exports.role = role;
